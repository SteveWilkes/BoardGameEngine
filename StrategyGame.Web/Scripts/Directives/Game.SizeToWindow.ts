module AgileObjects.StrategyGame.Game {
    game.directive("sizeToWindow", ["$window",
        ($window: ng.IWindowService) => {
            return ($scope: IGameScope) => {
                return angular.element($window).bind("resize", () => {
                    for (var i = 0; i < $scope.windowResizeListeners.length; i++) {
                        $scope.windowResizeListeners[i].handleEvent();
                    }
                    $scope.$apply();
                });
            };
        }
    ]);
}