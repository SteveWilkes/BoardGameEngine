module AgileObjects.StrategyGame.Game {

    export var game = angular.module('strategyGameApp', []);

    export interface IGameScope extends ng.IScope {
        board: Board;
    }

    game.factory("$jQuery", ["$window",
        ($window: ng.IWindowService) => <JQueryStatic>$window["jQuery"]
    ]);
}