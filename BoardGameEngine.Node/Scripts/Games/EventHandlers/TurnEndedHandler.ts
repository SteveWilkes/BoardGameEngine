import CpuPlayerAi = require("../../Players/CpuPlayerAi");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class TurnEndedHandler implements G.IGameSocketEventHandler {
    private _cpuPlayerAi: CpuPlayerAi;

    constructor(
        private _gameMapper: G.GameMapper,
        private _saveGameCommand: Ts.ICommand<G.Game>) {

        this._cpuPlayerAi = new CpuPlayerAi();
    }

    public setup(socket: G.IGameSocket): void {
        socket.on("turnEnded",(turnData: I.TurnData) => {
            this._getGame(turnData, socket,(err, game) => {
                if (!game.status.turnManager.currentTeam.owner.isHuman) { return; }

                var nextTeamIndex = this._applyTurn(turnData, game);

                socket.emit("turnValidated", nextTeamIndex);
                socket.emitToGameListeners("turnEnded", turnData, game.id);

                if (!game.status.turnManager.currentTeam.owner.isHuman) {
                    process.nextTick(() => this._performCpuTurnIfNecessary(game, socket));
                }
            });
        });
    }

    private _getGame(turnData: I.TurnData, socket: G.IGameSocket, callback: (err: Error, game?: G.Game) => void): void {
        var game = socket.getGameOrNull(turnData.gameId);
        if (game !== null) {
            callback(null, game);
            return;
        }

        this._gameMapper.map(turnData.gameData,(err, g) => {
            if (err) {
                callback(err);
                return;
            }

            socket.addGame(g);
            callback(null, g);
        });
    }

    private _applyTurn(turnData: I.TurnData, game: G.Game): number {
        var turnApplicationManager = new Bge.Interactions.TurnApplicationManager(game);

        for (var i = 0; i < turnData.interactionData.length; i++) {
            var interactionId = turnData.interactionData[i];
            turnApplicationManager.apply(interactionId);
            console.log("Interaction synchronised: " + interactionId.signature);
        }

        return this._endTurn(game);
    }

    private _endTurn(game: G.Game): number {
        var nextTeamIndex: number;

        Bge.Interactions.TurnCompletionManager.complete(game, nti => nextTeamIndex = nti);

        this._saveGameCommand.execute(game);

        return nextTeamIndex;
    }

    private _performCpuTurnIfNecessary(game: G.Game, socket: G.IGameSocket) {
        var cpuTurnData = this._cpuPlayerAi.getNextTurn(game.status.turnManager.currentTeam, game.id);

        this._endTurn(game);

        socket.emitToGameRoom("turnEnded", cpuTurnData, game.id);
    }
}

export = TurnEndedHandler;