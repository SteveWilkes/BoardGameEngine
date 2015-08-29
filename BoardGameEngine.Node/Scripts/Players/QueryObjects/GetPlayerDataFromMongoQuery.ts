import MongoDb = require("mongodb");

class GetPlayerDataFromMongoQuery implements Ts.IGetQuery<Pl.PlayerData> {

    constructor(private _mongoCallback: (callback: (db: MongoDb.Db) => void) => void) { }

    public execute(playerId: string, callback: (getError: Error, playerData: Pl.PlayerData) => void): void {
        this._mongoCallback(db => db.collection("players").findOne({ id: playerId }, callback));
    }
}

export = GetPlayerDataFromMongoQuery;