module AgileObjects.StrategyGame.Game {

    export var strategyGameApp = "strategyGameApp";

    var game = angular.module(strategyGameApp, []);

    export interface IGameScope extends ng.IScope {
        game: Game;
    }

    Angular.Directives.addDraggable(game);
    Angular.Directives.addDraggableDroppable(game);
    Angular.Directives.addDroppable(game);
    Angular.Directives.addScrollToBottom(game);
    Angular.Directives.addSizeToContainer(game);
    Angular.Directives.addTabs(game);

    Angular.Services.addIdGenerator(game);
}