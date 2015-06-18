import express = require("express");
import RouteBase = require("../RouteBase");

var gameTypePattern = "[a-z\-0-9]+";

var routes = [
    "/",
    "/game/" + gameTypePattern + "/" + RouteBase.idPattern,
    "/game/" + RouteBase.idPattern
];

class Index extends RouteBase {
    constructor() {
        super(
            routes,
            (req: express.Request, res: express.Response) => res.render("index", {}));
    }
}

export = Index;