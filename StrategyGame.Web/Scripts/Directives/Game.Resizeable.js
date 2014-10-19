var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.game.directive("resizeable", [
                "$window",
                function ($window) {
                    return function ($scope) {
                        return angular.element($window).bind("resize", function () {
                            for (var propertyName in $scope) {
                                if (propertyName.substring(0, 1) === "$") {
                                    continue;
                                }
                                var propertyValue = $scope[propertyName];
                                if (typeof propertyValue.resize === "function") {
                                    propertyValue.resize();
                                }
                            }
                            $scope.$apply();
                        });
                    };
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Directives/Game.Resizeable.js.map
