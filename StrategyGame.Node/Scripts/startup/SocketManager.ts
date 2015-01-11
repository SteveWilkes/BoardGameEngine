import bs = require("Bootstrap");
import socketFactory = require("socket.io");

class SocketManager implements bs.IBootstrapper {
    public setup(info: bs.SystemInfo): void {
        var io = socketFactory(info.server);

        io.on("connection", socket => {

            socket.on("gameStarted", (gameId: string) => {
                console.log("Game " + gameId + " started for socket " + socket.id);
            });

            socket.on("pieceMoved", (movementCoordinates: Array<string>) => {
                var origin = movementCoordinates[0];
                var destination = movementCoordinates[movementCoordinates.length - 1];
                console.log("Game on socket " + socket.id + ": piece moved from " + origin + " to " + destination);
            });
        });
    }
}

var factory = () => { return new SocketManager(); };

export = factory;