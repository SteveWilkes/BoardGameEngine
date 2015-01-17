module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;

    class GameController {
        constructor(
            private _displayManager: Boards.BoardDisplayManager,
            private _gameFactory: IGameFactory,
            private _scope: IGameScope) {

            this._scope.globalEvents = GlobalEventSet.instance;
            this._scope.displayManager = this._displayManager;

            this._newGame("1");
        }

        private _newGame(gameTypeId: string): void {
            this._scope.game = this._gameFactory.createNewGame(gameTypeId, 2);

            this._displayManager.resize(this._scope.game.board);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [Boards.$boardDisplayManager, $gameFactory, "$scope", GameController]);
}