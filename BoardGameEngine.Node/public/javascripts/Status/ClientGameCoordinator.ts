module AgileObjects.BoardGameEngine.Status {

    export var $clientGameCoordinator = "$clientGameCoordinator";

    "ClientOnly";
    class ClientGameCoordinator implements Ui.IGameUiComponent {
        constructor(private _socket: SocketIO.Socket) { }

        public initialise(game: Games.Game): void {
            game.events.gameStarted.subscribe(() => {
                this._socket.emit("gameStarted", new GameData(game));
                return true;
            });

            game.events.turnStarted.subscribe(team => {
                this._socket.emit("turnStarted", team.id);
                return true;
            });

            game.events.turnEnded.subscribe(team => {
                var turnActions = new Array<Pieces.IGameAction>();
                if (team.isLocal()) {
                    var actions = game.status.history.actions;
                    for (var i = actions.length - 1; i >= 0; i--) {
                        if (actions[i].piece.team === team) {
                            turnActions.unshift(actions[i]);
                        } else {
                            break;
                        }
                    }
                }
                this._socket.emit("turnEnded", Status.TurnData.forActions(turnActions));
                return true;
            });

            this._socket.on("turnValidated", (nextTeamIndex: number) => {
                game.events.turnValidated.publish(game.teams[nextTeamIndex]);
            });

            this._socket.on("turnEnded", (turnData: Status.TurnData) => {
                var currentTeamPieces = game.status.turnManager.currentTeam.getPieces();
                for (var i = 0; i < turnData.interactionData.length; i++) {
                    var turnInteraction = turnData.interactionData[i];
                    if (!currentTeamPieces.hasOwnProperty(turnInteraction.pieceId)) {
                        // Out of sync
                    }
                    var piece = currentTeamPieces[turnInteraction.pieceId];
                    var potentialInteractions = piece.interactionProfile.getPotentialInteractions(game);
                    if (!potentialInteractions.hasOwnProperty(turnInteraction.interactionId)) {
                        // Out of sync
                    }
                    potentialInteractions[turnInteraction.interactionId].complete();
                }
            });
        }
    }

    angular
        .module(strategyGameApp)
        .service($clientGameCoordinator, [Angular.Services.$socketFactory, ClientGameCoordinator]);
}