import ISessionSocketEventHandler = require("../../Generic/AgileObjects.Node.ISessionSocketEventHandler");
import ISessionSocket = require("../../Generic/AgileObjects.Node.ISessionSocket");

var Ao: Typings.AgileObjectsNs = require("../../../InternalModules");
var Bge = Ao.BoardGameEngine;

class TurnEndedHandler implements ISessionSocketEventHandler {
    constructor(
        private _gameMapper: G.GameMapper,
        private _saveGameCommand: Ts.ICommand<G.Game>) {
    }

    public setup(socket: ISessionSocket): void {
        socket.on("turnEnded",(turnData: I.TurnData) => {
            var game = this._getGame(turnData, socket);

            if (game.status.turnManager.currentTeam.owner.isHuman) {
                this._applyTurn(turnData, game);
            }

            var nextTeamIndex = this._endTurn(game);

            this._saveGameCommand.execute(game);

            socket.emit("turnValidated", nextTeamIndex);
        });
    }

    private _getGame(turnData: I.TurnData, socket: ISessionSocket): G.Game {
        if (!socket.session.hasOwnProperty("game")) {
            var game = this._gameMapper.map(turnData.gameData);
            socket.session.game = game;
        }

        return socket.session.game;
    }

    private _applyTurn(turnData: I.TurnData, game: G.Game): void {
        for (var i = 0; i < turnData.interactionData.length; i++) {
            var turnInteractionData = turnData.interactionData[i];
            var interactionId = Bge.Interactions.InteractionId.from(turnInteractionData.interactionId);
            this._gameMapper.completeInteraction(interactionId, game);
            console.log("Interaction synchronised: " + interactionId.signature);
        }
    }

    private _endTurn(game: G.Game): number {
        // TODO: Deduplicate logic from GameMapper:
        var currentTeam = game.status.turnManager.currentTeam;
        var currentTeamIndex = game.teams.indexOf(currentTeam);
        var nextTeamIndex = currentTeamIndex + 1;
        if (nextTeamIndex === game.teams.length) {
            nextTeamIndex = 0;
        }

        var nextTeam = game.teams[nextTeamIndex];
        game.events.turnValidated.publish(nextTeam);

        return nextTeamIndex;
    }
}

export = TurnEndedHandler;