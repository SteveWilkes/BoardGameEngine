module AgileObjects.BoardGameEngine.Games {

    export class GameStartedHandler implements Node.ISessionSocketEventHandler {

        constructor(
            private _gameMapper: GameMapper,
            private _getGetDataQuery: Ts.IGetQuery<GameData>,
            private _saveGameCommand: Ts.ICommand<Game>) { }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted",(gameData: GameData) => {
                var game = this._setupGameSession(gameData, socket);
                this._saveGameCommand.execute(game);
                console.log("Game " + game.id + " created and saved");
            });

            socket.on("gameRestarted",(gameId: string) => {
                var gameData = this._getGetDataQuery.execute(gameId);
                var game = this._setupGameSession(gameData, socket);
                console.log("Game " + game.id + " recreated");
            });
        }

        private _setupGameSession(gameData: GameData, socket: Node.ISessionSocket): Game {
            var game = this._gameMapper.map(gameData);
            socket.session.game = game;

            return game;
        }
    }
}