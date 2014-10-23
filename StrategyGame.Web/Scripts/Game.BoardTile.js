var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardTile = (function () {
                function BoardTile(position) {
                    this.position = position;
                    this.isDark = (position.isEvenRow && position.isEvenColumn) || (!position.isEvenRow && !position.isEvenColumn);
                }
                BoardTile.prototype.resize = function (newSize, resizeFactor) {
                    this.size = newSize;

                    if (this.isOccupied()) {
                        this.piece.resize(resizeFactor);
                    }
                };

                BoardTile.prototype.isOccupied = function () {
                    return this.piece !== undefined;
                };

                BoardTile.prototype.assign = function (piece) {
                    console.log("Piece " + piece.id + " assigned");
                    this.piece = piece;
                };

                BoardTile.prototype.pieceMovedTo = function (destinationTile) {
                    var piece = this.piece;
                    this.piece = undefined;

                    destinationTile.assign(piece);
                };
                return BoardTile;
            })();
            Game.BoardTile = BoardTile;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardTile.js.map
