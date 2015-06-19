module AgileObjects.BoardGameEngine.Games {

    export var $clientGameCoordinator = "$clientGameCoordinator";

    "ClientOnly";
    class ClientGameCoordinator implements Ui.IClientComponent {
        private _turnApplicationManager: I.TurnApplicationManager;

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
            this._turnApplicationManager = new Interactions.TurnApplicationManager(game);

            this._registerClientEventHandlers(game);
            this._registerServerEventHandlers(game);
        }

        private _registerClientEventHandlers(game: G.Game) {
            game.events.turnStarted.subscribe(team => {
                return this._socketEmit("turnStarted", team.id);
            });

            game.events.turnEnded.subscribe(team => {
                var turnActions = new Array<I.IGameAction>();
                var isFirstMove = true;
                if (team.isLocal()) {
                    var actions = game.status.history.actions;
                    for (var i = actions.length - 1; i >= 0; i--) {
                        if (actions[i].piece.team === team) {
                            turnActions.unshift(actions[i]);
                        } else {
                            isFirstMove = false;
                            break;
                        }
                    }
                } else {
                    isFirstMove = false;
                }

                var turnData = Interactions.TurnData.from(turnActions);

                if (isFirstMove) {
                    turnData.gameData = new GameData(game);
                    turnData.gameData.historyData.clear();
                }

                return this._socketEmit("turnEnded", turnData);
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
                this._turnApplicationManager.apply(turnData);
            });
        }
    }

    angular
        .module(strategyGameApp)
        .service($clientGameCoordinator, [Angular.Services.$socketFactory, Games.$gameMapper, ClientGameCoordinator]);
}