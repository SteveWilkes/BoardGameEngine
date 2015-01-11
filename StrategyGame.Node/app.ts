import path = require("path");
import express = require("express");
import http = require("http");
import bs = require("./Scripts/startup/Bootstrap");

interface IFileSystem {
    readFileSync(filename: string, options?: { flag?: string; }): NodeBuffer;
    writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
}

class NodeApp {
    private _systemInfo: bs.SystemInfo;

    constructor(private _bootstrappers: Array<bs.IBootstrapper>) {
        var isReleaseMode = process.env.NODE_ENV === "Release";
        var publicRoot = path.join(__dirname, "public");

        var app = this._createApp(isReleaseMode, publicRoot);
        var server = http.createServer(app);

        this._systemInfo = new bs.SystemInfo(
            isReleaseMode,
            publicRoot,
            path.join(__dirname, "assets"),
            server,
            app);
    }

    private _createApp(isReleaseMode: boolean, publicRoot: string): express.Express {
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

        app.use(express.static(publicRoot));

        if (!isReleaseMode) {
            app.use(express.errorHandler());
        }

        return app;
    }

    public start() {
        for (var i = 0; i < this._bootstrappers.length; i++) {
            this._bootstrappers[i].setup(this._systemInfo);
        }

        this._systemInfo.server.listen(this._systemInfo.port, () => {
            console.log("Server listening on port " + this._systemInfo.port);
        });
    }
}

var app = new NodeApp([
    require("./Scripts/startup/CssGenerator")(),
    require("./Scripts/startup/ResourceBundler")(),
    require("./Scripts/startup/Router")(),
    require("./Scripts/startup/SocketManager")()
]);

app.start();