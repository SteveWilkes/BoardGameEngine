module AgileObjects.BoardGameEngine.Ui {

    export var $urlManager = "$urlManager";

    "ClientOnly"
    export class UrlManager implements IClientComponent {
        constructor(
            private _routingService: ng.route.IRouteService,
            private _locationService: ng.ILocationService) { }

        public initialise(game: G.Game): void {
            if (this._locationService.path() === "/") {
                this._locationService.path("game/" + game.type.id + "/" + game.id, false);
            }
        }

        public gameId(): string {
            return this._routingService.current.params.gameId;
        }
    }

    angular
        .module(strategyGameApp)
        .service($urlManager, ["$route", "$location", UrlManager]);
}