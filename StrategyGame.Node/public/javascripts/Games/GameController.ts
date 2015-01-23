module AgileObjects.StrategyGame.Games {
    import Boards = StrategyGame.Boards;

    "ClientOnly";
    class GameController {
        constructor(
            public displayManager: Boards.BoardDisplayManager,
            private _gameService: GameService,
            private _gameUiComponentSet: Ui.IGameUiComponent) {

            this.globalEvents = GlobalEventSet.instance;

            this.startDefaultGame("1");
        }

        public globalEvents: GlobalEventSet;
        public game: Games.Game;

        public startDefaultGame(gameTypeId: string): void {
            this.game = this._gameService.startDefaultGame("1");

            this._gameUiComponentSet.initialise(this.game);
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