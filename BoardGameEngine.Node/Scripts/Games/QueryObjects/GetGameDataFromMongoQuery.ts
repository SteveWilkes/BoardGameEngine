import MongoDb = require("mongodb");

class GetGameDataFromMongoQuery implements Ts.IGetQuery<G.GameData> {
    
    constructor(private _mongoCallback: (callback: (db: MongoDb.Db) => void) => void) { }

    public execute(gameId: string, callback: (err: Error, gd: G.GameData) => void): void {
        this._mongoCallback(db => db.collection("games").findOne({ gameId: gameId }, callback));
    }
}

export = GetGameDataFromMongoQuery;