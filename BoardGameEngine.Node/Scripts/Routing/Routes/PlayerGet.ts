import express = require("express");
import RouteBase = require("../RouteBase");
import PlayerRepository = require("../../Players/PlayerRepository");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class PlayerGet extends RouteBase {
    constructor(playerRepository: PlayerRepository) {
        super(
            ["/api/players/" + RouteBase.idPattern],
            (req: express.Request, res: express.Response) => {
                var playerId = req.url.substring(req.url.lastIndexOf("/") + 1);
                var playerData = playerRepository.getData(playerId);

                res.json(playerData)
            });
    }
}

export = PlayerGet;