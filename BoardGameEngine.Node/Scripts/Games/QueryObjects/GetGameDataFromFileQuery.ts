class GetGameDataFromFileQuery implements Ts.IGetQuery<G.GameData> {
    private _rootSaveDirectory: string;

    constructor(private _fileManager: Ts.IFileManager) {
        this._rootSaveDirectory = this._fileManager.joinPaths(
            this._fileManager.getAppRootDirectory(),
            "_savedData",
            "games");
    }

    public execute(gameId: string, callback: (err: Error, gd: G.GameData) => void): void {
        var pathToGameSaveFile = this._fileManager.joinPaths(
            this._rootSaveDirectory,
            gameId + ".json");

        var gameDataJson = this._fileManager.readAllText(pathToGameSaveFile);
        var gameData = JSON.parse(gameDataJson);

        callback(null, gameData);
    }
}

export = GetGameDataFromFileQuery;