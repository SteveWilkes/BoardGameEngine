var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;

class PlayerRepository {
    constructor(private _getPlayerDataQuery: Ts.IGetQuery<Pl.PlayerData>) { }

    public getData(playerId: string) {
        var playerData = this._getPlayerDataQuery.execute(playerId);

        if (playerData == null) {
            var guest = new Bge.Players.Player(playerId, "Guest", true);
            playerData = new Bge.Players.PlayerData(guest);
        }

        return playerData;
    }
}

export = PlayerRepository;