import MongoDb = require("mongodb");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class SaveGameToMongoCommand implements Ts.ICommand<G.Game> {

    constructor(private _mongoCallback: (callback: (db: MongoDb.Db) => void) => void) { }

    public execute(game: G.Game, callback: (err: Error) => void): void {
        var gameData = new Bge.Games.GameData(game);

        game.hasOwnProperty("_id")
            ? this._updateGame(game, gameData, callback)
            : this._insertNewGame(game, gameData, callback);
    }

    private _updateGame(game: G.Game, gameData: G.GameData, callback: (err: Error) => void): void {
        var newHistoryData = gameData.historyData.slice(game["_latestMoveIndex"]);

        var updateArgument = (newHistoryData.length === 1)
            ? { $push: { historyData: newHistoryData[0] } }
            : { $pushAll: { historyData: newHistoryData } };

        this._mongoCallback(db => db.collection("games").update(
            { gameId: game.id },
            updateArgument,
            { w: 1 },
            updateError => {
                if (updateError) {
                    return callback(updateError);
                }

                game["_latestMoveIndex"] = gameData.historyData.length;
                callback(null);
            }));
    }

    private _insertNewGame(game: G.Game, gameData: G.GameData, callback: (err: Error) => void): void {
        this._mongoCallback(db => db.collection("games").insert(gameData, { w: 1 },(insertError, result) => {
            if (insertError) {
                return callback(insertError);
            }

            game["_id"] = result.insertedIds[0];
            game["_latestMoveIndex"] = gameData.historyData.length;
            callback(null);
        }));
    }
}

export = SaveGameToMongoCommand;