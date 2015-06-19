import ISessionSocketEventHandler = require("../../Generic/AgileObjects.Node.ISessionSocketEventHandler");
import ISessionSocket = require("../../Generic/AgileObjects.Node.ISessionSocket");

class GameStartedHandler implements ISessionSocketEventHandler {
    constructor(
        private _gameMapper: G.GameMapper,
        private _getGetDataQuery: Ts.IGetQuery<G.GameData>,
        private _saveGameCommand: Ts.ICommand<G.Game>) { }

    public setup(socket: ISessionSocket): void {
        socket.on("gameStarted",(gameData: G.GameData) => {
            var game = this._setupGameSession(gameData, socket);
            this._saveGameCommand.execute(game);
            console.log("Game " + game.id + " created and saved");
        });

        socket.on("gameRestarted",(gameId: string) => {
            var gameData = this._getGetDataQuery.execute(gameId);
            var game = this._setupGameSession(gameData, socket);
            console.log("Game " + game.id + " recreated");
        });
    }

    private _setupGameSession(gameData: G.GameData, socket: ISessionSocket): G.Game {
        var game = this._gameMapper.map(gameData);
        socket.session.game = game;

        return game;
    }
}

export = GameStartedHandler;