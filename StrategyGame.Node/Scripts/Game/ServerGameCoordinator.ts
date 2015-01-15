module AgileObjects.StrategyGame.Game {

    export class ServerGameCoordinator {
        public setup(socket: Node.ISessionSocket): void {
            socket.on("gameStarted", (gameId: string) => {
                socket.session.gameId = gameId;
            });

            socket.on("pieceMoved", (movementCoordinates: Array<string>) => {
                var gameId = socket.session.gameId;
                var origin = movementCoordinates[0];
                var destination = movementCoordinates[movementCoordinates.length - 1];
                console.log("Game " + gameId + " on socket " + socket.id + ": piece moved from " + origin + " to " + destination);
            });
        }
    }
};