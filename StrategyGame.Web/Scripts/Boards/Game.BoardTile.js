var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardTile = (function () {
                function BoardTile(position) {
                    this.position = position;
                    this.isDark = (position.isEvenRow && position.isEvenColumn) || (!position.isEvenRow && !position.isEvenColumn);
                }
                BoardTile.prototype.isOccupied = function () {
                    return this.piece !== undefined;
                };

                BoardTile.prototype.add = function (piece) {
                    this.piece = piece;
                };

                BoardTile.prototype.movePieceTo = function (destination) {
                    var piece = this.piece;
                    this.piece = undefined;

                    destination.add(piece);
                };
                return BoardTile;
            })();
            Game.BoardTile = BoardTile;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardTile.js.map
