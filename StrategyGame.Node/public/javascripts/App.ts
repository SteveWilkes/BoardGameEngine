module AgileObjects.StrategyGame.Game {

    export var strategyGameApp = "strategyGameApp";

    var game = angular.module(strategyGameApp, ["ngAnimate", "btford.socket-io"]);

    export interface IGameScope extends ng.IScope {
        globalEvents: GlobalEventSet;
        game: Game;
    }

    Angular.Directives.addAddClassOnEvent(game);
    Angular.Directives.addDraggable(game);
    Angular.Directives.addDraggableDroppable(game);
    Angular.Directives.addDroppable(game);
    Angular.Directives.addScrollToBottom(game);
    Angular.Directives.addSizeToContainer(game);
    Angular.Directives.addTabs(game);

    Angular.Services.addIdGenerator(game);
    Angular.Services.addEventPropogation(game);
    Angular.Services.addSockets(game);
}