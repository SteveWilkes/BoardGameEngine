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
        socket.on("turnEnded",(turnData: I.TurnData) =>
            this._getGame(turnData, socket,(err, game) => {
                if (err) {
                    // TODO: Handle error
                    return;
                }

                if (!game.status.turnManager.currentTeam.owner.isHuman) { return; }

                this._applyTurn(turnData, game,(applyError, nextTeamIndex) => {
                    if (applyError) {
                        // TODO: Handle error
                        return;
                    }

                    socket.emit("turnValidated", nextTeamIndex);
                    socket.emitToGameListeners("turnEnded", turnData, game.id);

                    // TODO: Isn't this always true?
                    if (!game.status.turnManager.currentTeam.owner.isHuman) {
                        process.nextTick(() => this._performCpuTurn(game, socket));
                    }
                });
            }));
    }

    private _getGame(turnData: I.TurnData, socket: G.IGameSocket, callback: (err: Error, game?: G.Game) => void): void {
        var game = socket.getGameOrNull(turnData.gameId);
        if (game !== null) {
            return callback(null, game);
        }

        this._gameMapper.map(turnData.gameData,(mapError, g) => {
            if (mapError) {
                return callback(mapError);
            }

            socket.addGame(g);
            callback(null, g);
        });
    }

    private _applyTurn(turnData: I.TurnData, game: G.Game, callback: (err: Error, nti?: number) => void): void {
        var turnApplicationManager = new Bge.Interactions.TurnApplicationManager(game);

        for (var i = 0; i < turnData.interactionData.length; i++) {
            var interactionId = turnData.interactionData[i];
            turnApplicationManager.apply(interactionId);
            console.log("Interaction synchronised: " + interactionId.signature);
        }

        this._endTurn(game, callback);
    }

    private _endTurn(game: G.Game, callback: (err: Error, nti?: number) => void): void {
        Bge.Interactions.TurnCompletionManager.complete(
            game,
            nextTeamIndex => this._saveGameCommand.execute(game, saveError => {
                if (saveError) {
                    return callback(saveError);
                }

                callback(null, nextTeamIndex);
            }));
    }

    private _performCpuTurn(game: G.Game, socket: G.IGameSocket) {
        var cpuTurnData = this._cpuPlayerAi.getNextTurn(game.status.turnManager.currentTeam, game.id);

        this._endTurn(game, err => {
            if (err) {
                // TODO: Handle error
                return;
            }

            socket.emitToGameRoom("turnEnded", cpuTurnData, game.id);
        });
    }
}

export = TurnEndedHandler;