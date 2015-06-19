module AgileObjects.BoardGameEngine.Players {

    export class SavePlayerCommand implements Ts.ICommand<Player> {
        private _rootSaveDirectory: string;

        constructor(private _fileManager: Ts.IFileManager) {
            this._rootSaveDirectory = this._fileManager.joinPaths(
                this._fileManager.getAppRootDirectory(),
                "_savedData");
        }

        public execute(player: Player): void {
            var playerJson = JSON.stringify(player);

            var pathToPlayerSaveFile = this._fileManager.joinPaths(
                this._rootSaveDirectory,
                "player_" + player.id + ".json");

            this._fileManager.deleteFile(pathToPlayerSaveFile);
            this._fileManager.writeAllText(pathToPlayerSaveFile, playerJson);
        }
    }
}