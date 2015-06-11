module AgileObjects.BoardGameEngine {

    export var strategyGameApp = "strategyGameApp";

    var useGameRoute = { templateUrl: "Games/game" };

    var configureRouting = (
        $routeProvider: ng.route.IRouteProvider,
        $locationProvider: ng.ILocationProvider) => {

        $routeProvider
            .when("/", useGameRoute)
            .when("/game/:gameTypeId/:gameId", useGameRoute);

        $locationProvider.html5Mode(true);
    }

    var game = angular
        .module(strategyGameApp, ["ngAnimate", "ngRoute", "btford.socket-io"])
        .config(configureRouting)
        .run(["$route", "$rootScope", "$location", ($route, $rootScope, $location) => {
        var original = $location.path;
        $location.path = (path, reload) => {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess',() => {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }]);

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