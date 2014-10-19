var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.game.directive("sizeToWindow", [
                "$window",
                function ($window) {
                    return function ($scope) {
                        return angular.element($window).bind("resize", function () {
                            for (var i = 0; i < $scope.windowResizeListeners.length; i++) {
                                $scope.windowResizeListeners[i].handleEvent();
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
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Directives/Game.SizeToWindow.js.map
