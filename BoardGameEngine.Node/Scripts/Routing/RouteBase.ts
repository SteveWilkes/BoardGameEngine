import express = require("express");

class RouteBase {
    constructor(
        private _routePaths: Array<string>,
        private _handler: express.RequestFunction) {
    }

    static idPattern = "[a-z0-9]+";

    public configure(app: express.Express): void {
        for (var i = 0; i < this._routePaths.length; i++) {
            app.get(this._routePaths[i], this._handler);
        }
    }
}

export = RouteBase;