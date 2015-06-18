import express = require("express");
import RouteBase = require("../RouteBase");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class PlayerGet extends RouteBase {
    constructor() {
        super(
            ["/api/players/" + RouteBase.idPattern],
            (req: express.Request, res: express.Response) => res.json(this._getPlayerData(req)));
    }

    private _getPlayerData(req: express.Request) {
        var playerId = req.url.substring(req.url.lastIndexOf("/") + 1);
        var player = new Bge.Players.Player(playerId, "Guest", true);
        var playerData = new Bge.Players.PlayerData(player);

        return playerData;
    }
}

export = PlayerGet;