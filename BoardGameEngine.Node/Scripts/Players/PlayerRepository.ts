var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;

class PlayerRepository {
    constructor(private _getPlayerDataQuery: Ts.IGetQuery<Pl.PlayerData>) { }

    public getData(playerId: string, callback: (err: Error, pd?: Pl.PlayerData) => void) {
        this._getPlayerDataQuery.execute(playerId,(playerDataError, playerData) => {
            if (playerDataError) {
                callback(playerDataError);
                return;
            }

            if (playerData == null) {
                var guest = new Bge.Players.Player(playerId, "Guest", true);
                playerData = new Bge.Players.PlayerData(guest);
            }

            callback(null, playerData);
        });
    }
}

export = PlayerRepository;