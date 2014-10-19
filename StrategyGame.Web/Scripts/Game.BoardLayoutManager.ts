module AgileObjects.StrategyGame.Game {

    export interface IBoardLayoutManager extends IListener {
    }

    class BoardLayoutManager implements IBoardLayoutManager {
        // ReSharper disable InconsistentNaming
        constructor(
            private _$window: ng.IWindowService,
            private _$config: BoardConfig,
            private _$boardManager: IBoardManager) {
            // ReSharper restore InconsistentNaming
            this._resizeTiles();
        }

        public handleEvent(): void {
            this._resizeTiles();
        }

        private _resizeTiles(): void {
            this._$boardManager.board.resizeTo(this._$window.innerHeight);
        }
    }

    game.factory("$boardLayoutManager", ["$window", "$boardConfig", "$boardManager",
        ($window: ng.IWindowService, $config: BoardConfig, $boardManager: IBoardManager) =>
            new BoardLayoutManager($window, $config, $boardManager)
    ]);
}