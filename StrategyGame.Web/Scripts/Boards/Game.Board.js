var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                function Board(_container, _sizeSet) {
                    this._container = _container;
                    this._sizeSet = _sizeSet;
                    this._createTiles();
                    this.pieceMover = new Game.PieceMover(this._tilesByCoordinates);
                }
                Board.prototype._createTiles = function () {
                    this.tiles = new Array();
                    this._tilesByCoordinates = {};
                    for (var row = 0; row < this._sizeSet.gridSize; row++) {
                        for (var column = 0; column < this._sizeSet.gridSize; column++) {
                            var coordinates = Game.coordinatesRegistry.get(row + 1, column + 1);
                            var tile = new Game.BoardTile(coordinates);
                            this._tilesByCoordinates[coordinates.signature] = tile;
                            this.tiles.push(tile);
                        }
                    }

                    this.tiles[0].assign(new Game.Piece("piece-1", "/Content/Pieces/Example.png", new Game.AnyDirectionMovementProfile(2)));
                };

                Board.prototype.resize = function () {
                    this._sizeSet.recalculate(this._container.getSize());
                    this.size = this._sizeSet.boardSize;
                    for (var i = 0; i < this.tiles.length; i++) {
                        this.tiles[i].resize(this._sizeSet);
                    }
                };
                return Board;
            })();
            Game.Board = Board;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.Board.js.map
