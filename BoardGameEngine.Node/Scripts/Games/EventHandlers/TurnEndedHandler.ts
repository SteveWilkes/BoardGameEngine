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
            var game = this._getGame(turnData, socket);

            if (game.status.turnManager.currentTeam.owner.isHuman) {
                this._applyTurn(turnData, game);
            }

            var nextTeamIndex = this._endTurn(game);

            this._saveGameCommand.execute(game);

            socket.emit("turnValidated", nextTeamIndex);
            socket.emitToGameListeners("turnEnded", turnData, game.id);

            if (!game.status.turnManager.currentTeam.owner.isHuman) {
                process.nextTick(() => this._performCpuTurnIfNecessary(game, socket));
            }
        });
    }

    private _getGame(turnData: I.TurnData, socket: G.IGameSocket): G.Game {
        var game = socket.getGameOrNull(turnData.gameId);
        if (game === null) {
            game = this._gameMapper.map(turnData.gameData);
            socket.addGame(game);
        }

        return game;
    }

    private _applyTurn(turnData: I.TurnData, game: G.Game): void {
        var turnApplicationManager = new Bge.Interactions.TurnApplicationManager(game);

        for (var i = 0; i < turnData.interactionData.length; i++) {
            var interactionId = turnData.interactionData[i];
            turnApplicationManager.apply(interactionId);
            console.log("Interaction synchronised: " + interactionId.signature);
        }
    }

    private _endTurn(game: G.Game): number {
        var nextTeamIndex: number;

        Bge.Interactions.TurnCompletionManager.complete(game, nti => nextTeamIndex = nti);

        return nextTeamIndex;
    }

    private _performCpuTurnIfNecessary(game: G.Game, socket: G.IGameSocket) {
        var cpuTurnData = this._cpuPlayerAi.getNextTurn(game.status.turnManager.currentTeam, game.id);

        socket.emitToGameRoom("turnEnded", cpuTurnData, game.id);
    }
}

export = TurnEndedHandler;