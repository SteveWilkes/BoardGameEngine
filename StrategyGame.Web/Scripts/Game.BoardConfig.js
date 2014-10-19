var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardConfig = (function () {
                function BoardConfig(gridSize, tileBorderWidth) {
                    this.gridSize = gridSize;
                    this.tileBorderWidth = tileBorderWidth;
                }
                return BoardConfig;
            })();
            Game.BoardConfig = BoardConfig;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardConfig.js.map
