module AgileObjects.StrategyGame.Status {

    export var $gameCoordinationClient = "$gameCoordinationClient";

    "ClientOnly";
    class GameCoordinationClient implements Ui.IGameUiComponent {
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
                this._socket.emit("turnEnded", team.id);
                return true;
            });

            game.events.pieceMoved.subscribe(movement => {
                this._socket.emit(
                    "pieceMoved",
                    movement.origin.coordinates.signature,
                    movement.destination.coordinates.signature);
                return true;
            });

            game.events.pieceAttacked.subscribe(attack => {
                this._socket.emit(
                    "pieceAttacked",
                    attack.attacker.id,
                    attack.interactionId);
                return true;
            });

            this._socket.on("turnValidated", (nextTeamIndex: number) => {
                game.events.turnValidated.publish(game.teams[nextTeamIndex]);
            });

            this._socket.on("turnTaken", (turnData: Status.TurnData) => {
                var currentTeamPieces = game.status.getCurrentTeam().getPieces();
                for (var i = 0; i < turnData.interactionData.length; i++) {
                    var turnInteraction = turnData.interactionData[i];
                    if (!currentTeamPieces.hasOwnProperty(turnInteraction.pieceId)) {
                        // Out of sync
                    }
                    var piece = currentTeamPieces[turnInteraction.pieceId];
                    var potentialInteractions =
                        piece.interactionProfile.getPotentialInteractions(piece, game);
                    for (var k = 0; k < potentialInteractions.length; k++) {
                        if (potentialInteractions[k].id === turnInteraction.interactionId) {
                            potentialInteractions[k].complete();
                            break;
                        }
                    }
                }
            });
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameCoordinationClient, [Angular.Services.$socketFactory, GameCoordinationClient]);
}