module AgileObjects.StrategyGame.Game {

    export var strategyGameApp = "strategyGameApp";

    var game = angular.module(strategyGameApp, []);

    export interface IGameScope extends ng.IScope {
        game: Game;
    }

    Angular.Directives.addRemoveClass(game);
    Angular.Directives.addSizeToContainer(game);
    Angular.Directives.addDraggable(game);
    Angular.Directives.addDroppable(game);
    Angular.Directives.addDraggableDroppable(game);
}