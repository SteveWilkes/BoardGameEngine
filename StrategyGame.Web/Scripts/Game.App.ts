module AgileObjects.StrategyGame.Game {

    export var game = angular.module('strategyGameApp', []);

    export interface IGameScope extends ng.IScope {
        game: Game;
    }

    AgileObjects.Angular.Directives.addRemoveClass(game);
    AgileObjects.Angular.Directives.addSizeToContainer(game);
    AgileObjects.Angular.Directives.addDraggable(game);
    AgileObjects.Angular.Directives.addDroppable(game);

    game.factory("$jQuery", ["$window",
        ($window: ng.IWindowService) => <JQueryStatic>$window["jQuery"]
    ]);
}