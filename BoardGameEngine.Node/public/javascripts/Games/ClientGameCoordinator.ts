module AgileObjects.BoardGameEngine.Games {

    export var $clientGameCoordinator = "$clientGameCoordinator";

    "ClientOnly";
    class ClientGameCoordinator implements Ui.IClientComponent {
        private _turnApplicationManager: I.TurnApplicationManager;

        constructor(
            private _socket: SocketIO.Socket,
            private _localPlayerService: Pl.LocalPlayerService,
            private _gameMapper: G.GameMapper) {

            GlobalEventSet.instance.playerJoinRequested.subscribe(request => {
                return this._socketEmit("playerJoinRequested", request);
            });

            this._socket.on("playerJoinValidated",(gameData: GameData) => {
                var game = this._gameMapper.map(gameData);
                GlobalEventSet.instance.gameLoaded.publish(game);
                var localPlayerId = this._localPlayerService.getPlayerId();
                this._socketEmit("gameRestarted", game.id, localPlayerId);
            });
        }

        public initialise(game: Games.Game): void {
            this._turnApplicationManager = new Interactions.TurnApplicationManager(game);

            this._registerLocalGameEventHandlers(game);
            this._registerRemoteGameEventHandlers(game);
        }

        private _registerLocalGameEventHandlers(game: G.Game) {
            game.events.turnEnded.subscribe(team => {
                if (!team.isHuman()) {
                    return Interactions.TurnCompletionManager.complete(game);
                }

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

                var turnData = Interactions.TurnData.from(turnActions, game.id);

                if (isFirstMove) {
                    turnData.gameData = new GameData(game);
                    turnData.gameData.historyData.clear();
                }

                return this._socketEmit("turnEnded", turnData);
            });
        }

        private _socketEmit(eventName: string, ...data: Array<any>): boolean {
            var args = [eventName].concat(data);
            return this._socket.emit.apply(this._socket, args) !== undefined;
        }

        private _registerRemoteGameEventHandlers(game: G.Game) {
            this._socket.on("turnValidated",(nextTeamIndex: number) => {
                game.events.turnValidated.publish(game.teams[nextTeamIndex]);
            });

            this._socket.on("turnEnded",(turnData: I.TurnData) => {
                this._turnApplicationManager.apply(turnData);
            });
        }
    }

    var dependencies: Array<string|Function> = [
        Angular.Services.$socketFactory,
        Players.$localPlayerService,
        Games.$gameMapper];

    angular
        .module(strategyGameApp)
        .service($clientGameCoordinator, dependencies.concat(ClientGameCoordinator));
}