module AgileObjects.StrategyGame.Game {
    export var game = angular.module('strategyGameApp', []);

    game.factory("$jQuery", ["$window",
        ($window: ng.IWindowService) => <JQueryStatic>$window["jQuery"]
    ]);

    game.directive("removeClass", () => {
        return {
            restrict: "A",
            link: (scope: any, element: any, attrs: ng.IAttributes) => {
                element.removeClass(attrs["removeClass"]);
            }
        };
    });

    game.directive("sizeToWindow", ["$window", "$boardLayoutManager",
        ($window: ng.IWindowService, $layoutManager: IBoardLayoutManager) => {
            return ($scope: ng.IScope) => {
                return angular.element($window).bind("resize", () => {
                    $layoutManager.resizeTiles();
                    $scope.$apply();
                });
            };
        }
    ]);
}