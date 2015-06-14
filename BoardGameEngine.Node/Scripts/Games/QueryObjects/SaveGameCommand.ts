module AgileObjects.BoardGameEngine.Games {

    export class SaveGameCommand implements Ts.ICommand<Game> {
        private _rootSaveDirectory: string;

        constructor(private _fileManager: Ts.IFileManager) {
            this._rootSaveDirectory = this._fileManager.joinPaths(
                this._fileManager.getAppRootDirectory(),
                "_savedGames");
        }

        public execute(game: Game): void {
            var gameData = new GameData(game);
            var gameDataJson = JSON.stringify(gameData);

            var pathToGameSaveFile = this._fileManager.joinPaths(
                this._rootSaveDirectory,
                game.id + ".json");

            this._fileManager.deleteFile(pathToGameSaveFile);
            this._fileManager.writeAllText(pathToGameSaveFile, gameDataJson);
        }
    }
}