var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                // ReSharper disable InconsistentNaming
                function Board(_container, _settings) {
                    this._container = _container;
                    this._settings = _settings;
                    // ReSharper restore InconsistentNaming
                    this.state = new Game.BoardState(this._settings);
                    this.tiles = this.state.tiles;
                }
                Board.prototype.resize = function () {
                    var containerSize = this._container.getSize();
                    var resizeFactor = containerSize / Game.defaultContainerSize;
                    var tileSize = Math.floor(containerSize / this._settings.tileSizeFactor);
                    for (var i = 0; i < this.tiles.length; i++) {
                        this.tiles[i].resize(tileSize, resizeFactor);
                    }
                    var tilesSize = tileSize * this._settings.gridSize;
                    var tileBordersSize = this._settings.tileBorderWidth * 2 * this._settings.gridSize;
                    this.size = tilesSize + tileBordersSize;
                };
                return Board;
            })();
            Game.Board = Board;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Board.js.map
