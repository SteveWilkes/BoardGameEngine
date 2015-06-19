import express = require("express");
import RouteBase = require("../RouteBase");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class PlayerGet extends RouteBase {
    constructor(getPlayerDataQuery: Ts.IGetQuery<Pl.PlayerData>) {
        super(
            ["/api/players/" + RouteBase.idPattern],
            (req: express.Request, res: express.Response) => {
                var playerId = req.url.substring(req.url.lastIndexOf("/") + 1);
                var playerData = getPlayerDataQuery.execute(playerId);

                if (playerData == null) {
                    var guest = new Bge.Players.Player(playerId, "Guest", true);
                    playerData = new Bge.Players.PlayerData(guest);
                }

                res.json(playerData)
            });
    }
}

export = PlayerGet;