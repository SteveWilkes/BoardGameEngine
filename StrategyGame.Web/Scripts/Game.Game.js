var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (_Game) {
            var Game = (function () {
                function Game(board, turnManager, sizeManager, events) {
                    this.board = board;
                    this.turnManager = turnManager;
                    this.sizeManager = sizeManager;
                    this.events = events;
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
