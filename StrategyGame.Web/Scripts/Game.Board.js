var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                // ReSharper disable InconsistentNaming
                function Board(_container, config) {
                    this._container = _container;
                    this.config = config;
                    // ReSharper restore InconsistentNaming
                    this._createTiles();
                }
                Board.prototype._createTiles = function () {
                    this.tiles = new Array();
                    for (var row = 0; row < this.config.settings.gridSize; row++) {
                        for (var column = 0; column < this.config.settings.gridSize; column++) {
                            this.tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }

                    this.tiles[0].piece = new Game.PieceBase("piece-1", "/Content/Pieces/Example.png");
                };

                Board.prototype.resize = function () {
                    var containerSize = this._container.getSize();
                    var resizeFactor = containerSize / Game.defaultContainerSize;
                    var tileSize = Math.floor(containerSize / this.config.settings.tileSizeFactor);
                    for (var i = 0; i < this.tiles.length; i++) {
                        this.tiles[i].resize(tileSize, resizeFactor);
                    }
                    var tilesSize = tileSize * this.config.settings.gridSize;
                    var tileBordersSize = this.config.settings.tileBorderWidth * 2 * this.config.settings.gridSize;
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
