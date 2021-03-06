﻿import bs = require("Bootstrap");
import express = require("express");
import http = require("http");

class CommunicationManager implements bs.IBootstrapper {
    private _app: express.Express;

    constructor(
        private _socketServer: SocketIO.Server,
        private _sessionStore: Nd.ISessionStore,
        private _socketEventHandlers: Array<G.IGameSocketEventHandler>) { }

    public appCreated(info: bs.SystemInfo, app: express.Express): void {
        this._app = app;
    }

    public serverCreated(info: bs.SystemInfo, server: http.Server): void {
        var socketServer = this._socketServer.listen(server);

        this._setupSocketMiddleware(socketServer);

        socketServer.on(
            "connection",
            (socket: G.IGameSocket) => {
                for (var i = 0; i < this._socketEventHandlers.length; i++) {
                    this._socketEventHandlers[i].setup(socket);
                }
            });
    }

    private _setupSocketMiddleware(socketServer: SocketIO.Server) {
        socketServer.use((socket, next) => this._parseSignedCookies(socket, next));
        socketServer.use((socket, next) => this._retrieveSessionObject(socket, next));
        socketServer.use((socket, next) => this._decorateAsGameSocket(socket, next));
    }

    private _parseSignedCookies(socket: SocketIO.Socket, next: (err?: Error) => void): void {
        var cookieParser: express.Handler = this._app["cookieParser"];

        cookieParser(socket.request, null, err => {
            if (!err) {
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
        var sessionSocket = <Nd.ISessionSocket>socket;
        if (sessionSocket.session) {
            next();
            return;
        }

        this._sessionStore.get(socket.request.sessionId,(err, session) => {
            if (!err) {
                sessionSocket.session = session;
                sessionSocket.session.id = socket.request.sessionId;
                delete socket.request.sessionId;
            }
            next(err);
        });
    }

    private _decorateAsGameSocket(socket: SocketIO.Socket, next: (err?: Error) => void) {
        if (socket.hasOwnProperty("getGameRoom")) {
            next();
            return;
        }

        var gameSocket = <G.IGameSocket>socket;

        gameSocket.getGameRoomId = function (gameId: string) {
            return "game-" + gameId;
        }

        gameSocket.getGameOrNull = function (gameId: string) {
            var thisGameSocket = <G.IGameSocket>this;
            return thisGameSocket.session.hasOwnProperty("games")
                ? thisGameSocket.session.games[gameId] : null;
        }

        gameSocket.getGames = function () {
            var thisGameSocket = <G.IGameSocket>this;
            if (!thisGameSocket.session.hasOwnProperty("games")) {
                thisGameSocket.session.games = {};
            }
            return thisGameSocket.session.games;
        }

        gameSocket.addGame = function (game: G.Game) {
            var thisGameSocket = <G.IGameSocket>this;
            thisGameSocket.getGames()[game.id] = game;
            thisGameSocket.join(thisGameSocket.getGameRoomId(game.id));
        }

        gameSocket.emitToGameListeners = function <TData>(eventName: string, data: TData, gameId: string) {
            var thisGameSocket = <G.IGameSocket>this;
            thisGameSocket.broadcast.to(thisGameSocket.getGameRoomId(gameId)).emit(eventName, data);
        }

        gameSocket.emitToGameRoom = function <TData>(eventName: string, data: TData, gameId: string) {
            var thisGameSocket = <G.IGameSocket>this;
            thisGameSocket.emit(eventName, data);
            thisGameSocket.emitToGameListeners(eventName, data, gameId);
        }

        next();
    }
}

export = CommunicationManager;