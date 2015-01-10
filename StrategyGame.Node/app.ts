import path = require("path");
import express = require('express');
import bundleUp = require("bundle-up");
import routes = require("./routes/index");
import stylus = require("stylus");

interface IFileSystem {
    readFileSync(filename: string, options?: { flag?: string; }): NodeBuffer;
    writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
}

module AgileObjects.StrategyGame {

    class NodeApp {
        private _isReleaseMode: boolean;
        private _assetsRoot: string;
        private _publicRoot: string;
        private _app: express.Express;

        constructor(fileSystem: IFileSystem, stylus: stylus.Stylus) {
            this._isReleaseMode = process.env.NODE_ENV === "Release";
            this._assetsRoot = path.join(__dirname, "assets");
            this._publicRoot = path.join(__dirname, "public");

            this._regenerateStyleSheetsIfRequired(fileSystem, stylus);

            var app = this._createApp();

            this._bundleResources(app);
            this._setupRouting(app);

            this._app = app;
        }

        private _regenerateStyleSheetsIfRequired(fileSystem: IFileSystem, stylus: stylus.Stylus): void {
            if (this._isReleaseMode) { return; }

            var stylesheets = ["site", "board-tile-attack-animation"];
            for (var i = 0; i < stylesheets.length; i++) {
                var stylusData = fileSystem.readFileSync(
                    path.join(this._publicRoot, "stylesheets/" + stylesheets[i] + ".styl"),
                    { encoding: "UTF8" });
                stylus(stylusData)
                    .render((stylusErr: Error, css: string) => {
                        if (stylusErr) { throw stylusErr; }
                        fileSystem.writeFileSync(
                            path.join(this._publicRoot, "generated/stylesheets/" + stylesheets[i] + ".css"),
                            css);
                    });
            }
            console.log("Stylus CSS updated");
        }

        private _createApp(): express.Express {

            var app = express();

            app.set("port", process.env.PORT || 3000);
            app.set("views", path.join(__dirname, "views"));
            app.set("view engine", "jade");
            app.use(express.favicon());
            app.use(express.logger("dev"));
            app.use(express.json());
            app.use(express.urlencoded());
            app.use(express.methodOverride());
            app.use(app.router);

            app.use(express.static(this._publicRoot));

            if (!this._isReleaseMode) {
                app.use(express.errorHandler());
            }

            return app;
        }

        private _bundleResources(app: express.Express): void {
            bundleUp(app, this._assetsRoot, {
                staticRoot: this._publicRoot,
                staticUrlRoot: "/",
                bundle: this._isReleaseMode,
                minifyCss: this._isReleaseMode,
                minifyJs: this._isReleaseMode
            });
        }

        private _setupRouting(app: express.Express): void {
            app.get("/", routes.index);
        }

        public start() {

            var http = require("http").createServer(this._app);

            this._setupGameSockets(http);

            http.listen(this._app.get("port"), () => {
                console.log("Server listening on port " + this._app.get("port"));
            });
        }

        private _setupGameSockets(http: express.Application): void {
            var io = require("socket.io")(http);

            io.on("connection", (socket: SocketIO.Socket) => {

                socket.on("gameStarted", (gameId: string) => {
                    console.log("Game " + gameId + " started for socket " + socket.id);
                });

                socket.on("pieceMoved", (movementCoordinates: Array<string>) => {
                    var origin = movementCoordinates[0];
                    var destination = movementCoordinates[movementCoordinates.length - 1];
                    console.log("Game on socket " + socket.id + ": piece moved from " + origin + " to " + destination);
                });
            });
        }
    }

    new NodeApp(require("fs"), require("stylus")).start();
}