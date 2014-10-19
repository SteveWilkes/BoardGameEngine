var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var tileSizeFactor = 14;

            var Board = (function () {
                // ReSharper disable InconsistentNaming
                function Board(_gridSize, _tileBorderWidth) {
                    this._gridSize = _gridSize;
                    this._tileBorderWidth = _tileBorderWidth;
                    // ReSharper restore InconsistentNaming
                    this.tiles = new Array();
                    for (var row = 0; row < this._gridSize; row++) {
                        for (var column = 0; column < this._gridSize; column++) {
                            this.tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }
                }
                Board.prototype.resizeTo = function (containerSize) {
                    var tileSize = Math.floor(containerSize / tileSizeFactor);
                    for (var i = 0; i < this.tiles.length; i++) {
                        this.tiles[i].size = tileSize;
                    }
                    var tilesSize = tileSize * this._gridSize;
                    var tileBordersSize = this._tileBorderWidth * 2 * this._gridSize;
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
