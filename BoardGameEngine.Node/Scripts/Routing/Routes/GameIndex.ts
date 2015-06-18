import express = require("express");
import RouteBase = require("../RouteBase");

class GameIndex extends RouteBase {
    constructor() {
        super(
            ["/newGame", "/loadGame/" + RouteBase.idPattern],
            (req: express.Request, res: express.Response) => res.render("Games/game", {}));
    }
}

export = GameIndex;