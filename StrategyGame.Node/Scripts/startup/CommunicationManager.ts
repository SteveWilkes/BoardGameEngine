import http = require("http");
import bs = require("Bootstrap");
import Game = AgileObjects.StrategyGame.Game;

class CommunicationManager implements bs.IBootstrapper {
    constructor(
        private _socketFactory: (server: http.Server) => SocketIO.Server,
        private _serverGameCoordinatorFactory: (socket: SocketIO.Socket) => Game.ServerGameCoordinator) { }

    public setup(info: bs.SystemInfo): void {
        var socketServer = this._socketFactory(info.server);

        socketServer.on(
            "connection",
            socket => this._serverGameCoordinatorFactory(socket).start());
    }
}

export = CommunicationManager;