import bs = require("Bootstrap");

class Router implements bs.IBootstrapper {
    constructor(private _routes: Object) { }

    public setup(info: bs.SystemInfo): void {
        info.app.get("/", this._routes["index"]);
    }
}

export = Router;