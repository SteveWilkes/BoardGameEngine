module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;

    class GameController {
        constructor(
            public displayManager: Boards.BoardDisplayManager,
            private _gameFactory: IGameFactory) {

            this.globalEvents = GlobalEventSet.instance;

            this._newGame("1");
        }

        public globalEvents: GlobalEventSet;
        public game: Game;

        private _newGame(gameTypeId: string): void {
            this.game = this._gameFactory.createNewGame(gameTypeId, 2);

            this.displayManager.resize(this.game.board);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [Boards.$boardDisplayManager, $gameFactory, GameController]);
}