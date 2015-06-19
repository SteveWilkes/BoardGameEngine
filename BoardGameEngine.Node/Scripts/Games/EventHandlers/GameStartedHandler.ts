import ISessionSocketEventHandler = require("../../Generic/AgileObjects.Node.ISessionSocketEventHandler");
import ISessionSocket = require("../../Generic/AgileObjects.Node.ISessionSocket");

class GameStartedHandler implements ISessionSocketEventHandler {
    constructor(
        private _gameMapper: G.GameMapper,
        private _getGetDataQuery: Ts.IGetQuery<G.GameData>) { }

    public setup(socket: ISessionSocket): void {
        socket.on("gameRestarted",(gameId: string) => {
            var gameData = this._getGetDataQuery.execute(gameId);
            var game = this._gameMapper.map(gameData);
            socket.session.game = game;
            console.log("Game " + game.id + " recreated");
        });
    }
}

export = GameStartedHandler;