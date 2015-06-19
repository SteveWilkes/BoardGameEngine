class GetPlayerDataQuery implements Ts.IGetQuery<Pl.PlayerData> {
    private _rootSaveDirectory: string;

    constructor(private _fileManager: Ts.IFileManager) {
        this._rootSaveDirectory = this._fileManager.joinPaths(
            this._fileManager.getAppRootDirectory(),
            "_savedData");
    }


    public execute(playerId: string): Pl.PlayerData {
        var pathToPlayerSaveFile = this._fileManager.joinPaths(
            this._rootSaveDirectory,
            "player_" + playerId + ".json");

        var playerData = null

        if (this._fileManager.fileExists(pathToPlayerSaveFile)) {
            var playerDataJson = this._fileManager.readAllText(pathToPlayerSaveFile);
            playerData = JSON.parse(playerDataJson);
        }

        return playerData;
    }
}

export = GetPlayerDataQuery;