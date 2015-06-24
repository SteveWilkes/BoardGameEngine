module AgileObjects.BoardGameEngine.Games {
    import Boards = BoardGameEngine.Boards;

    "ClientOnly";
    class GameController extends ControllerBase {
        private _localPlayer: Pl.Player;

        constructor(
            private _localPlayerService: Pl.LocalPlayerService,
            private _gameService: GameService,
            private _clientComponentSet: Ui.CompositeClientComponentSet) {

            super();

            GlobalEventSet.instance.gameLoaded.subscribe(game => this._handleGameLoaded(game) === void (0));

            this.globalEvents = GlobalEventSet.instance;
            this.displayManager = this._clientComponentSet.displayManager;

            var requestedGameId = this._clientComponentSet.urlManager.gameId();

            if (requestedGameId !== undefined) {
                this.loadGame(requestedGameId);
                return;
            }

            this._localPlayerService.get(localPlayer => {
                this._localPlayer = localPlayer;
                this.startGame();
            });
        }

        public globalEvents: GlobalEventSet;
        public displayManager: B.BoardDisplayManager;
        public game: Game;

        public startGame(): void {
            this.startDefaultGame("run-the-bomb");
        }

        public startDefaultGame(gameTypeId: string): void {
            this._initialiseGame(this._gameService.createDefaultGame(gameTypeId, this._localPlayer));
            this.game.start();
        }

        public loadGame(gameId: string): void {
            var localPlayerId = this._localPlayerService.getPlayerId();
            var joinRequest = new Players.PlayerJoinRequest(localPlayerId, gameId);
            this.globalEvents.playerJoinRequested.publish(joinRequest);
        }

        private _handleGameLoaded(game: Game): void {
            this._assignLocalPlayer(game);
            this._initialiseGame(game);
        }

        private _assignLocalPlayer(game: Game): void {
            var localPlayerId = this._localPlayerService.getPlayerId();

            for (var i = 0; i < game.players.length; i++) {
                var player = game.players[i];
                if (player.id === localPlayerId) {
                    player.isLocal = true;
                    this._localPlayer = player;
                    return;
                }
            }
        }

        private _initialiseGame(game: Game): void {
            this.game = game;
            this._clientComponentSet.initialise(game);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [
        Players.$localPlayerService,
        $gameService,
        Ui.$clientComponentSet,
        GameController]);
}