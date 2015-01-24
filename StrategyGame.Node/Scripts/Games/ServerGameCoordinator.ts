module AgileObjects.StrategyGame.Games {

    export class ServerGameCoordinator {
        constructor(private _gameFactory: GameFactory, private _teamFactory: Teams.TeamFactory) { }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted", (gameData: Status.GameData) => {
                socket.session.game = this._createServerSideGameRepresentation(gameData);
                console.log("Session Game " + gameData.gameId + " created");
            });

            socket.on("pieceMoved", (movementCoordinates: Array<string>) => {
                /*
                var gameId = socket.session.game.id;
                var origin = movementCoordinates[0];
                var destination = movementCoordinates[movementCoordinates.length - 1];
                console.log("Game " + gameId + " on socket " + socket.id + ": piece moved from " + origin + " to " + destination);*/
            });
        }

        private _createServerSideGameRepresentation(gameData: Status.GameData): Game {
            var game = this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId);

            for (var i = 0; i < gameData.playerData.length; i++) {
                var data = gameData.playerData[i].split("*");
                var player = new Players.Player(data[0], data[1] === "1");
                game.add(player);
                for (var j = 2; j < data.length; j++) {
                    var team = this._teamFactory.createTeam(player, gameData.gameTypeId);
                    game.board.add(team);
                }
            }

            return game;
        }
    }
};