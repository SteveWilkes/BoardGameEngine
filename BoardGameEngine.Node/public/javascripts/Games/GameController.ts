module AgileObjects.BoardGameEngine.Games {
    import Boards = BoardGameEngine.Boards;

    "ClientOnly";
    class GameController {
        private _localPlayer: Pl.Player;

        constructor(
            public displayManager: Boards.BoardDisplayManager,
            private _gameService: GameService,
            private _gameUiComponentSet: Ui.IGameUiComponent) {

            this.globalEvents = GlobalEventSet.instance;
            this._localPlayer = new Players.Player("Guest", true, true);

            this.startGame();
        }

        public globalEvents: GlobalEventSet;
        public game: Games.Game;

        public startGame(): void {
            this.startDefaultGame("RunTheBomb");
        }

        public startDefaultGame(gameTypeId: string): void {
            this.game = this._gameService.createDefaultGame(gameTypeId, this._localPlayer);

            this._gameUiComponentSet.initialise(this.game);

            this.game.start();
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [
        Boards.$boardDisplayManager,
        $gameService,
        Ui.$gameUiComponentSet,
        GameController]);
}