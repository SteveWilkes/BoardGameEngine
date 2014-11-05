var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var squareRootOf2 = Math.sqrt(2);

            var BoardSizeManager = (function () {
                function BoardSizeManager(_defaults, _container, events) {
                    var _this = this;
                    this._defaults = _defaults;
                    this._container = _container;
                    events.containerResized.subscribe(function (board) {
                        return _this.resize(board);
                    });
                }
                BoardSizeManager.prototype.resize = function (board) {
                    if (board === undefined) {
                        return false;
                    }
                    var containerSize = this._container.getSize();
                    var boardDiagonalSize = containerSize * 0.9;
                    var tileDiagonalSize = boardDiagonalSize / board.gridSize;
                    var tileOuterSize = Math.floor(tileDiagonalSize / squareRootOf2);
                    this.boardSize = tileOuterSize * board.gridSize;
                    this.tileSize = tileOuterSize - (this._defaults.tileBorderWidth * 2);
                    var resizeFactor = containerSize / this._defaults.containerSize;
                    this.pieceWidth = Math.floor(this._defaults.pieceWidth * resizeFactor);
                    this.pieceHeight = Math.floor(this._defaults.pieceHeight * resizeFactor);

                    return true;
                };
                return BoardSizeManager;
            })();
            Game.BoardSizeManager = BoardSizeManager;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardSizeManager.js.map
