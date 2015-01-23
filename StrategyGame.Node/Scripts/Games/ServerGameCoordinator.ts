module AgileObjects.StrategyGame.Games {

    export class ServerGameCoordinator {
        constructor(private _gameFactory: GameFactory) { }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted", (gameId: string, gameTypeId: string) => {
                socket.session.game = this._gameFactory.createNewGame(gameId, gameTypeId);
                console.log("Session Game " + gameId + " created");
            });

            socket.on("pieceMoved", (movementCoordinates: Array<string>) => {
                /*
                var gameId = socket.session.game.id;
                var origin = movementCoordinates[0];
                var destination = movementCoordinates[movementCoordinates.length - 1];
                console.log("Game " + gameId + " on socket " + socket.id + ": piece moved from " + origin + " to " + destination);*/
            });
        }
    }
};