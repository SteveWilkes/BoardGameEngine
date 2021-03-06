﻿var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class SaveGameToFileCommand implements Ts.ICommand<G.Game> {
    private _rootSaveDirectory: string;

    constructor(private _fileManager: Ts.IFileManager) {
        this._rootSaveDirectory = this._fileManager.joinPaths(
            this._fileManager.getAppRootDirectory(),
            "_savedData",
            "games");
    }

    public execute(game: G.Game, callback: (err: Error) => void): void {
        var gameData = new Bge.Games.GameData(game);
        var gameDataJson = JSON.stringify(gameData);

        var pathToGameSaveFile = this._fileManager.joinPaths(
            this._rootSaveDirectory,
            game.id + ".json");

        this._fileManager.writeAllText(pathToGameSaveFile, gameDataJson);

        callback(null);
    }
}

export = SaveGameToFileCommand;