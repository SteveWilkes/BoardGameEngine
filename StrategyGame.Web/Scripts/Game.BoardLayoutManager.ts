module AgileObjects.StrategyGame.Game {

    export interface IBoardLayoutManager {
        resizeTiles(): void;
    }

    var tileSizeFactor = 14;

    class BoardLayoutManager {
        // ReSharper disable InconsistentNaming
        constructor(
            private _$window: ng.IWindowService,
            private _$config: BoardConfig,
            private _$boardManager: IBoardManager) {
            // ReSharper restore InconsistentNaming
            //this._$getWindow().resize(() => this._setTileSizes());
            this.resizeTiles();
        }

        public resizeTiles(): void {
            var currentHeight = this._$window.innerHeight;
            var tileSize = Math.floor(currentHeight / tileSizeFactor);
            for (var i = 0; i < this._$boardManager.board.tiles.length; i++) {
                this._$boardManager.board.tiles[i].size = tileSize;
            }
            var tilesSize = tileSize * this._$config.gridSize;
            var tileBordersSize = this._$config.tileBorderWidth * 2 * this._$config.gridSize;
            this._$boardManager.board.size = tilesSize + tileBordersSize;
        }
    }

    game.factory("$boardLayoutManager", ["$window", "$boardConfig", "$boardManager",
        ($window: ng.IWindowService, $config: BoardConfig, $boardManager: IBoardManager) =>
            new BoardLayoutManager($window, $config, $boardManager)
    ]);
}