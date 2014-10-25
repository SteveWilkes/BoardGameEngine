var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (_Game) {
            var Game = (function () {
                function Game(board, sizeManager) {
                    this.board = board;
                    this.sizeManager = sizeManager;
                    this.sizeManager.resize(this.board);
                }
                return Game;
            })();
            _Game.Game = Game;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Game.js.map
