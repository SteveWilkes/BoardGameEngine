import routes = require("../../routes/index");
import bs = require("Bootstrap");

class Router implements bs.IBootstrapper {

    public setup(info: bs.SystemInfo): void {
        info.app.get("/", routes.index);
    }
}

var factory = () => { return new Router(); };

export = factory;