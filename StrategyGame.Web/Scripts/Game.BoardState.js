var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardState = (function () {
                // ReSharper disable InconsistentNaming
                function BoardState(_settings) {
                    this._settings = _settings;
                    // ReSharper restore InconsistentNaming
                    this._createTiles();
                }
                BoardState.prototype._createTiles = function () {
                    this.tiles = new Array();
                    for (var row = 0; row < this._settings.gridSize; row++) {
                        for (var column = 0; column < this._settings.gridSize; column++) {
                            this.tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }

                    this.tiles[0].assign(new Game.PieceBase("piece-1", "/Content/Pieces/Example.png"));
                };

                BoardState.prototype.pieceMoving = function (originTile) {
                };

                BoardState.prototype.pieceMoved = function (detinationTile) {
                    return true;
                };
                return BoardState;
            })();
            Game.BoardState = BoardState;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardState.js.map
