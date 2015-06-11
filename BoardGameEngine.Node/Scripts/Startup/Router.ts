import http = require("http");
import express = require("express");
import bs = require("Bootstrap");

var gameType = "[a-z\-0-9]+";
var gameId = "[a-z0-9]+";

class Router implements bs.IBootstrapper {
    constructor(private _routes: Object) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        this._setRoutes(app, "index", "/", "/game/" + gameType + "/" + gameId, "/game/" + gameId);
        this._setRoutes(app, "gameIndex", "/newGame", "/loadGame/" + gameId);
    }

    private _setRoutes(app: express.Express, routeName: string, ...routes: Array<string>) {
        for (var i = 0; i < routes.length; i++) {
            app.get(routes[i], this._routes[routeName]);
        }
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void { }
}

export = Router;