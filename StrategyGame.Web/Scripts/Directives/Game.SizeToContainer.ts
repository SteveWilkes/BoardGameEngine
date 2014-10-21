module AgileObjects.StrategyGame.Game {
    game.directive("sizeToContainer", ["$window",
        ($window: ng.IWindowService) => {
            return ($scope: IGameScope) => {
                return angular.element($window).bind("resize", () => {
                    $scope.$apply("resize()");
                });
            };
        }
    ]);
}