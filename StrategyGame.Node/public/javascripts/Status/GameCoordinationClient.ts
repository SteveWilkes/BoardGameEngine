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

            this._socket.on("turnValidated", (nextTeamIndex: number) => {
                game.events.turnValidated.publish(game.teams[nextTeamIndex]);
            });

            this._socket.on("turnTaken", (turnData: Array<string>) => {
                var currentTeam = game.status.getCurrentTeam();
                for (var i = 0; i < turnData.length; i++) {
                    var interactionData = turnData[i].split("*");
                    for (var j = 0; j < currentTeam.pieces.length; j++) {
                        var piece = currentTeam.pieces[j];
                        if (piece.id === interactionData[0]) {
                            var potentialInteractions =
                                piece.interactionProfile.getPotentialInteractions(piece, game);
                            for (var k = 0; k < potentialInteractions.length; k++) {
                                if (potentialInteractions[k].id === interactionData[1]) {
                                    potentialInteractions[k].complete();
                                    break;
                                }
                            }
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