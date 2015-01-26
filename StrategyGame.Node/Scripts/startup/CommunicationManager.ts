import bs = require("Bootstrap");
import express = require("express");
import http = require("http");
import Games = AgileObjects.StrategyGame.Games;
import Node = AgileObjects.Node;

class CommunicationManager implements bs.IBootstrapper {
    private _app: express.Express;

    constructor(
        private _socketServer: SocketIO.Server,
        private _sessionStore: Node.ISessionStore,
        private _serverGameCoordinator: Games.GameCoordinationServer) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        this._app = app;
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void {
        var socketServer = this._socketServer.listen(server);

        this._setupSocketMiddleware(socketServer);

        socketServer.on(
            "connection",
            socket => {
                this._serverGameCoordinator.setup(<Node.ISessionSocket>socket);
            });
    }

    private _setupSocketMiddleware(socketServer: SocketIO.Server) {
        socketServer.use((socket, next) => this._parseSignedCookies(socket, next));
        socketServer.use((socket, next) => this._retrieveSessionObject(socket, next));
    }

    private _parseSignedCookies(socket: SocketIO.Socket, next: (err?: Error) => void): void {
        var cookieParser: express.Handler = this._app["cookieParser"];

        cookieParser(socket.request, null, err => {
            if (err == null) {
                if (socket.request.signedCookies) {
                    socket.request.sessionId = socket.request.signedCookies["express.sid"];
                    if (socket.request.sessionId == null) {
                        err = new Error("No sessionId cookie parsed");
                    }
                } else {
                    err = new Error("No signed cookies parsed");
                }
            }
            next(err);
        });
    }

    private _retrieveSessionObject(socket: SocketIO.Socket, next: (err?: Error) => void) {
        var sessionSocket = <Node.ISessionSocket>socket;
        if (sessionSocket.session != null) {
            next();
        } else {
            this._sessionStore.get(socket.request.sessionId, (err, session) => {
                if (err == null) {
                    sessionSocket.session = session;
                    sessionSocket.session.id = socket.request.sessionId;
                    delete socket.request.sessionId;
                }
                next(err);
            });
        }
    }
}

export = CommunicationManager;