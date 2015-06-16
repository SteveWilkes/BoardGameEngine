module AgileObjects.BoardGameEngine.Games {
    import Boards = BoardGameEngine.Boards;

    "ClientOnly";
    class GameController {
        private _localPlayer: Pl.Player;

        constructor(
            private _gameService: GameService,
            private _clientComponentSet: Ui.CompositeClientComponentSet) {

            GlobalEventSet.instance.gameLoaded.subscribe(game => this._handleGameLoaded(game) === void (0));

            this.globalEvents = GlobalEventSet.instance;
            this.displayManager = this._clientComponentSet.displayManager;
            this._localPlayer = new Players.Player("Guest", true, true);

            var requestedGameId = this._clientComponentSet.urlManager.gameId();

            (requestedGameId !== undefined) ? this.loadGame(requestedGameId) : this.startGame();
        }

        public globalEvents: GlobalEventSet;
        public displayManager: B.BoardDisplayManager;
        public game: Game;

        public startGame(): void {
            this.startDefaultGame("run-the-bomb");
        }

        public startDefaultGame(gameTypeId: string): void {
            this.game = this._gameService.createDefaultGame(gameTypeId, this._localPlayer);
            this._clientComponentSet.initialise(this.game);
            this.game.start();
        }

        public loadGame(gameId: string): void {
            var joinRequest = new Players.PlayerJoinRequest(this._localPlayer.id, gameId);
            this.globalEvents.playerJoinRequested.publish(joinRequest);
        }

        private _handleGameLoaded(game: Game): void {
            this.game = game;
            this._clientComponentSet.initialise(this.game);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [
        $gameService,
        Ui.$clientComponentSet,
        GameController]);
}