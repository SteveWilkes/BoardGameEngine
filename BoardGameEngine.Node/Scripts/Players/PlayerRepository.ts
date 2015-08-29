var Ao: Typings.AgileObjectsNs = require("../../InternalModules");
var Bge = Ao.BoardGameEngine;

class PlayerRepository {
    constructor(private _getPlayerDataQuery: Ts.IGetQuery<Pl.PlayerData>) { }

    public getData(playerId: string, callback: (err: Error, playerData?: Pl.PlayerData) => void) {
        this._getPlayerDataQuery.execute(playerId,(playerDataError, pd) => {
            if (playerDataError) {
                callback(playerDataError);
                return;
            }

            if (pd == null) {
                var guest = new Bge.Players.Player(playerId, "Guest", true);
                pd = new Bge.Players.PlayerData(guest);
            }

            callback(null, pd);
        });
    }
}

export = PlayerRepository;