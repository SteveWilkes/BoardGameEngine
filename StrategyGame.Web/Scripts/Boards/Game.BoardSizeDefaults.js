var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardSizeDefaults = (function () {
                function BoardSizeDefaults(containerSize, pieceWidth, pieceHeight, tileBorderWidth) {
                    this.containerSize = containerSize;
                    this.pieceWidth = pieceWidth;
                    this.pieceHeight = pieceHeight;
                    this.tileBorderWidth = tileBorderWidth;
                }
                return BoardSizeDefaults;
            })();
            Game.BoardSizeDefaults = BoardSizeDefaults;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardSizeDefaults.js.map
