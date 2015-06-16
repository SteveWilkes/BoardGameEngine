module AgileObjects.BoardGameEngine.Games {

    export var $clientGameCoordinator = "$clientGameCoordinator";

    "ClientOnly";
    class ClientGameCoordinator implements Ui.IClientComponent {
        constructor(
            private _socket: SocketIO.Socket,
            private _gameMapper: G.GameMapper) {

            GlobalEventSet.instance.playerJoinRequested.subscribe(request => {
                return this._socketEmit("playerJoinRequested", request);
            });

            this._socket.on("playerJoinValidated",(gameData: GameData) => {
                var game = this._gameMapper.map(gameData);
                GlobalEventSet.instance.gameLoaded.publish(game);
                this._socketEmit("gameRestarted", game.id);
            });
        }

        public initialise(game: Games.Game): void {
            this._registerClientEventHandlers(game);
            this._registerServerEventHandlers(game);
        }

        private _registerClientEventHandlers(game: G.Game) {

            game.events.gameStarted.subscribe(() => {
                return this._socketEmit("gameStarted", new GameData(game));
            });

            game.events.turnStarted.subscribe(team => {
                return this._socketEmit("turnStarted", team.id);
            });

            game.events.turnEnded.subscribe(team => {
                var turnActions = new Array<I.IGameAction>();
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
                return this._socketEmit("turnEnded", Interactions.TurnData.forActions(turnActions));
            });
        }

        private _socketEmit<TData>(eventName: string, data: TData): boolean {
            return this._socket.emit(eventName, data) !== undefined;
        }

        private _registerServerEventHandlers(game: G.Game) {
            this._socket.on("turnValidated",(nextTeamIndex: number) => {
                game.events.turnValidated.publish(game.teams[nextTeamIndex]);
            });

            this._socket.on("turnEnded",(turnData: I.TurnData) => {
                var currentTeamPieces = game.status.turnManager.currentTeam.getPieces();
                for (var i = 0; i < turnData.interactionData.length; i++) {
                    var turnInteraction = turnData.interactionData[i];
                    if (!currentTeamPieces.hasOwnProperty(turnInteraction.pieceId)) {
                        // Out of sync
                    }
                    var piece = currentTeamPieces[turnInteraction.pieceId];
                    var potentialInteractions = piece.interactionProfile.getPotentialInteractions();
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
        .service($clientGameCoordinator, [Angular.Services.$socketFactory, Games.$gameMapper, ClientGameCoordinator]);
}