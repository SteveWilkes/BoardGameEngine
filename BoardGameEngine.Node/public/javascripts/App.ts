module AgileObjects.BoardGameEngine {

    export var strategyGameApp = "strategyGameApp";

    var createGame = { templateUrl: "newGame" };

    var loadGame = {
        template: "<div data-ng-include src=\"url\"></div>",
        controller: ($scope, $routeParams) => {
            $scope.url = "loadGame/" + $routeParams.gameId;
        }
    };

    var configureRouting = ["$routeProvider", "$locationProvider", (
        routeProvider: ng.route.IRouteProvider,
        locationProvider: ng.ILocationProvider) => {

        routeProvider
            .when("/", createGame)
            .when("/game/:gameId", loadGame)
            .when("/game/:gameTypeId/:gameId", loadGame);

        locationProvider.html5Mode(true);
    }];

    var createNoReloadPathMethod = ["$route", "$rootScope", "$location", (
        routeService: ng.route.IRouteService,
        rootScope: ng.IRootScopeService,
        locationService) => {

        var original = locationService.path;
        locationService["path"] = (path: string, reload?: boolean) => {
            if (reload === false) {
                var lastRoute = routeService.current;
                var un = rootScope.$on('$locationChangeSuccess',() => {
                    routeService.current = lastRoute;
                    un();
                });
            }
            return <ng.ILocationService>original.call(locationService, path);
        };
    }];

    var game = angular
        .module(strategyGameApp, ["ngAnimate", "ngRoute", "btford.socket-io"])
        .config(configureRouting)
        .run(createNoReloadPathMethod);

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