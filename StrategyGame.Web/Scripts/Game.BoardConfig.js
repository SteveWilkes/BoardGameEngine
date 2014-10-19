var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardConfig = (function () {
                function BoardConfig() {
                    this.gridSize = 8;
                    this.tileBorderWidth = 2;
                }
                return BoardConfig;
            })();
            Game.BoardConfig = BoardConfig;

            Game.game.service("$boardConfig", BoardConfig);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardConfig.js.map
