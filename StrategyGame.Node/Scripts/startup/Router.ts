import http = require("http");
import express = require("express");
import bs = require("Bootstrap");

class Router implements bs.IBootstrapper {
    constructor(private _routes: Object) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        app.get("/", this._routes["index"]);
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = Router;