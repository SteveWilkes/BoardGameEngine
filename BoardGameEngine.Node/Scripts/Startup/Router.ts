import http = require("http");
import express = require("express");
import bs = require("Bootstrap");

class Router implements bs.IBootstrapper {
    constructor(private _routes: Object) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        this._setRoutes(app, "index", "/");
        this._setRoutes(app, "gameIndex", "/game", "/game*");
    }

    private _setRoutes(app: express.Express, routeName: string, ...routes: Array<string>) {
        for (var i = 0; i < routes.length; i++) {
            app.get(routes[i], this._routes[routeName]);
        }
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = Router;