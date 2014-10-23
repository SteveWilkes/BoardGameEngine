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
                    this._createTiles();
                    this.pieceMover = new Game.PieceMover(this._tilesByCoordinates);
                }
                Board.prototype._createTiles = function () {
                    this.tiles = new Array();
                    this._tilesByCoordinates = {};
                    for (var row = 0; row < this._settings.gridSize; row++) {
                        for (var column = 0; column < this._settings.gridSize; column++) {
                            var coordinates = new Game.Coordinates(row + 1, column + 1);
                            var tile = new Game.BoardTile(coordinates);
                            this._tilesByCoordinates[coordinates.toString()] = tile;
                            this.tiles.push(tile);
                        }
                    }

                    this.tiles[0].assign(new Game.PieceBase("piece-1", "/Content/Pieces/Example.png", new Game.AnyDirectionMovementProfile(2)));
                };

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
