module AgileObjects.StrategyGame.Game {
    game.directive("sizeToContainer", ["$window",
        ($window: ng.IWindowService) => {
            return ($scope: IGameScope) => {
                return angular.element($window).bind("resize", () => {
                    for (var propertyName in $scope) {
                        if (propertyName.substring(0, 1) === "$") { continue; }
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
}