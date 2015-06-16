module AgileObjects.BoardGameEngine.Games {

    export class TurnEndedHandler implements Node.ISessionSocketEventHandler {
        constructor(private _gameMapper: GameMapper, private _saveGameCommand: Ts.ICommand<Game>) { }

        public setup(socket: Node.ISessionSocket): void {
            socket.on("turnEnded",(turnData: I.TurnData) => {
                if (socket.session.game.status.turnManager.currentTeam.owner.isHuman) {
                    this._applyTurn(turnData, socket);
                }
                this._handleTurnEnded(socket);
            });
        }

        private _applyTurn(turnData: Interactions.TurnData, socket: Node.ISessionSocket): void {
            var game: Game = socket.session.game;
            for (var i = 0; i < turnData.interactionData.length; i++) {
                var turnInteractionData = turnData.interactionData[i];
                var interactionId = Interactions.InteractionId.from(turnInteractionData.interactionId);
                this._gameMapper.completeInteraction(interactionId, game);
                console.log("Interaction synchronised: " + interactionId);
            }
        }

        private _handleTurnEnded(socket: Node.ISessionSocket): void {
            var game: Game = socket.session.game;
            var currentTeam = game.status.turnManager.currentTeam;
            var currentTeamIndex = game.teams.indexOf(currentTeam);
            var nextTeamIndex = currentTeamIndex + 1;
            if (nextTeamIndex === game.teams.length) {
                nextTeamIndex = 0;
            }
            var nextTeam = game.teams[nextTeamIndex];
            game.events.turnValidated.publish(nextTeam);
            this._saveGameCommand.execute(game);
            socket.emit("turnValidated", nextTeamIndex);
        }
    }
}