import bs = require("./Scripts/Startup/Bootstrap");
import express = require("express");
import http = require("http");
import Ts = AgileObjects.TypeScript;

class NodeApp {
    private _systemInfo: bs.SystemInfo;
    private _app: express.Express;

    constructor(
        private _fileManager: Ts.IFileManager,
        private _serverFactory: (app: express.Express) => http.Server,
        private _bootstrappers: Array<bs.IBootstrapper>) {

        var isReleaseMode = process.env.NODE_ENV === "Release";

        this._systemInfo = new bs.SystemInfo(this._fileManager, isReleaseMode);
        this._app = this._createApp(this._systemInfo);

        for (var i = 0; i < this._bootstrappers.length; i++) {
            this._bootstrappers[i].appCreated(this._systemInfo, this._app);
        }
    }

    private _createApp(systemInfo: bs.SystemInfo): express.Express {
        var app = express();

        app.set("port", process.env.PORT || 3000);
        app.set("views", systemInfo.getPath("views"));
        app.set("view engine", "jade");
        app.use(express.favicon());
        app.use(express.logger("dev"));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());

        return app;
    }

    public start() {
        this._completeAppConfiguration();

        var server = this._serverFactory(this._app);

        for (var i = 0; i < this._bootstrappers.length; i++) {
            this._bootstrappers[i].serverCreated(this._systemInfo, server);
        }

        var port = this._app.get("port");

        server.listen(port, () => { console.log("Server listening on port " + port); });
    }

    private _completeAppConfiguration() {

        this._app.use(this._app.router);

        this._app.use(express.static(this._systemInfo.getPath("public")));

        if (!this._systemInfo.isReleaseMode) {
            this._app.use(express.errorHandler());
        }
    }
}

export = NodeApp;