module AgileObjects.BoardGameEngine {

    export var strategyGameApp = "strategyGameApp";

    var game = angular
        .module(strategyGameApp, ["ngAnimate", "btford.socket-io"])
        .config(($locationProvider: ng.ILocationProvider) => $locationProvider.html5Mode(true));

    Angular.Directives.addAddClassOnEvent(game);
    Angular.Directives.addDraggable(game);
    Angular.Directives.addDraggableDroppable(game);
    Angular.Directives.addDroppable(game);
    Angular.Directives.addMoveable(game);
    Angular.Directives.addScrollToBottom(game);
    Angular.Directives.addSizeToContainer(game);
    Angular.Directives.addTabs(game);

    Angular.Services.addIdGenerator(game);
    Angular.Services.addEventPropogation(game);
    Angular.Services.addSockets(game);
}