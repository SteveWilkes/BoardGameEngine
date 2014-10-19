var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.game = angular.module('strategyGameApp', []);

            Game.game.factory("$jQuery", [
                "$window",
                function ($window) {
                    return $window["jQuery"];
                }
            ]);

            Game.game.directive("removeClass", function () {
                return {
                    restrict: "A",
                    link: function (scope, element, attrs) {
                        element.removeClass(attrs["removeClass"]);
                    }
                };
            });
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.App.js.map
