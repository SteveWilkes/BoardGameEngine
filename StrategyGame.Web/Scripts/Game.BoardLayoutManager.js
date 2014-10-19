var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var tileSizeFactor = 14;

            var BoardLayoutManager = (function () {
                // ReSharper disable InconsistentNaming
                function BoardLayoutManager(_$window, _$config, _$boardManager) {
                    this._$window = _$window;
                    this._$config = _$config;
                    this._$boardManager = _$boardManager;
                    // ReSharper restore InconsistentNaming
                    //this._$getWindow().resize(() => this._setTileSizes());
                    this.resizeTiles();
                }
                BoardLayoutManager.prototype.resizeTiles = function () {
                    var currentHeight = this._$window.innerHeight;
                    var tileSize = Math.floor(currentHeight / tileSizeFactor);
                    for (var i = 0; i < this._$boardManager.board.tiles.length; i++) {
                        this._$boardManager.board.tiles[i].size = tileSize;
                    }
                    var tilesSize = tileSize * this._$config.gridSize;
                    var tileBordersSize = this._$config.tileBorderWidth * 2 * this._$config.gridSize;
                    this._$boardManager.board.size = tilesSize + tileBordersSize;
                };
                return BoardLayoutManager;
            })();

            Game.game.factory("$boardLayoutManager", [
                "$window", "$boardConfig", "$boardManager",
                function ($window, $config, $boardManager) {
                    return new BoardLayoutManager($window, $config, $boardManager);
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardLayoutManager.js.map
