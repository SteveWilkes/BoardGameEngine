module AgileObjects.StrategyGame.Games {

    export class ServerGameCoordinator {
        constructor(private _gameFactory: GameFactory, private _teamFactory: Teams.TeamFactory) { }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted", (gameData: Status.GameData) => {
                socket.session.game = this._createServerSideGameRepresentation(gameData);
                console.log("Session Game " + gameData.gameId + " created");
            });

            socket.on("pieceMoved", (originCoordinates: string, destinationCoordinates: string) => {
                var game: Game = socket.session.game;
                var boardTiles = game.board.getTiles();
                var origin = boardTiles[originCoordinates];
                var destination = boardTiles[destinationCoordinates];
                origin.movePieceTo(destination.piece || destination);
                console.log("Game " + game.id + ": piece moved from " + originCoordinates + " to " + destinationCoordinates);
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