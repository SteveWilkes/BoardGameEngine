module AgileObjects.StrategyGame.Game {

    export class ServerGameCoordinator {
        private _socketId: string;

        constructor(private _socket: SocketIO.Socket) {
            this._socketId = this._socket.id;
        }

        public start(): void {
            this._socket.on("gameStarted", (gameId: string) => {
                console.log("Game " + gameId + " started for socket " + this._socketId);
            });

            this._socket.on("pieceMoved", (movementCoordinates: Array<string>) => {
                var origin = movementCoordinates[0];
                var destination = movementCoordinates[movementCoordinates.length - 1];
                console.log("Game on socket " + this._socketId + ": piece moved from " + origin + " to " + destination);
            });
        }
    }
}