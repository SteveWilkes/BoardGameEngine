var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var squareRootOf2 = Math.sqrt(2);

            var BoardSizeSet = (function () {
                function BoardSizeSet(_defaults, gridSize) {
                    this._defaults = _defaults;
                    this.gridSize = gridSize;
                }
                BoardSizeSet.prototype.recalculate = function (containerSize) {
                    var boardDiagonalSize = containerSize * 0.9;
                    var tileDiagonalSize = boardDiagonalSize / this.gridSize;
                    var tileOuterSize = Math.floor(tileDiagonalSize / squareRootOf2);
                    this.boardSize = tileOuterSize * this.gridSize;
                    this.tileSize = tileOuterSize - (this._defaults.tileBorderWidth * 2);
                    var resizeFactor = containerSize / this._defaults.containerSize;
                    this.pieceWidth = Math.floor(this._defaults.pieceWidth * resizeFactor);
                    this.pieceHeight = Math.floor(this._defaults.pieceHeight * resizeFactor);
                };
                return BoardSizeSet;
            })();
            Game.BoardSizeSet = BoardSizeSet;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardSizeSet.js.map
