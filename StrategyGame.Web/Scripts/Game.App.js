var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.strategyGameApp = "strategyGameApp";

            var game = angular.module(Game.strategyGameApp, []);

            AgileObjects.Angular.Directives.addRemoveClass(game);
            AgileObjects.Angular.Directives.addSizeToContainer(game);
            AgileObjects.Angular.Directives.addDraggable(game);
            AgileObjects.Angular.Directives.addDroppable(game);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.App.js.map
