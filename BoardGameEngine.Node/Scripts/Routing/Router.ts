import http = require("http");
import express = require("express");
import bs = require("../Startup/Bootstrap");
import RouteBase = require("RouteBase");

class Router implements bs.IBootstrapper {
    constructor(private _routes: Array<RouteBase>) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        for (var i = 0; i < this._routes.length; i++) {
            this._routes[i].configure(app);
        }
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = Router;