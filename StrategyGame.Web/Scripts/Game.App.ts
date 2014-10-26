module AgileObjects.StrategyGame.Game {

    export var strategyGameApp = "strategyGameApp";

    var game = angular.module(strategyGameApp, []);

    export interface IGameScope extends ng.IScope {
        game: Game;
    }

    AgileObjects.Angular.Directives.addRemoveClass(game);
    AgileObjects.Angular.Directives.addSizeToContainer(game);
    AgileObjects.Angular.Directives.addDraggable(game);
    AgileObjects.Angular.Directives.addDroppable(game);
}