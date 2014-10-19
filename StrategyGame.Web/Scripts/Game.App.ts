module AgileObjects.StrategyGame.Game {
    export var game = angular.module('strategyGameApp', []);

    export interface IListener {
        handleEvent(): void;
    }

    export interface IGameScope extends ng.IScope {
        board: Board;
        windowResizeListeners: Array<IListener>;
    }

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
}