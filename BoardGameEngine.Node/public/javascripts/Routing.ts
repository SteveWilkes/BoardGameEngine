module AgileObjects.BoardGameEngine.Routing {

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

    export function setup(gameModule: ng.IModule) {
        gameModule.config(configureRouting)
    }
}