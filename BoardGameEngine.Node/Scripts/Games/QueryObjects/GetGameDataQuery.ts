module AgileObjects.BoardGameEngine.Games {

    export class GetGameDataQuery implements Ts.IGetQuery<GameData> {
        private _rootSaveDirectory: string;

        constructor(private _fileManager: Ts.IFileManager) {
            this._rootSaveDirectory = this._fileManager.joinPaths(
                this._fileManager.getAppRootDirectory(),
                "_savedGames");
        }


        public execute(gameId: string): GameData {
            var pathToGameSaveFile = this._fileManager.joinPaths(
                this._rootSaveDirectory,
                gameId + ".json");

            var gameDataJson = this._fileManager.readAllText(pathToGameSaveFile);
            var gameData = JSON.parse(gameDataJson);

            return null;
        }
    }
}