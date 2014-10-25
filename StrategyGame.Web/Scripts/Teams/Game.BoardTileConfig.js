var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardTileConfig = (function () {
                function BoardTileConfig(tileCoordinates, piece) {
                    this.tileCoordinates = tileCoordinates;
                    this.piece = piece;
                }
                return BoardTileConfig;
            })();
            Game.BoardTileConfig = BoardTileConfig;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Teams/Game.BoardTileConfig.js.map
