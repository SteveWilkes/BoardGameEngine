var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var tileSizeFactor = 14;

            var Board = (function () {
                function Board($config) {
                    this._gridSize = $config.gridSize;
                    this._tileBorderWidth = $config.tileBorderWidth;

                    this._createTiles();
                }
                Board.prototype._createTiles = function () {
                    this.tiles = new Array();
                    for (var row = 0; row < this._gridSize; row++) {
                        for (var column = 0; column < this._gridSize; column++) {
                            this.tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }
                };

                Board.prototype.sizeTo = function (container) {
                    var containerSize = container.getSize();
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

            Game.game.service("$board", ["$boardConfig", Board]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Board.js.map
