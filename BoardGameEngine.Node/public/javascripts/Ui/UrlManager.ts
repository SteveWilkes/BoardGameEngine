module AgileObjects.BoardGameEngine.Ui {

    export var $urlManager = "$urlManager";

    "ClientOnly"
    export class UrlManager implements IGameUiComponent {
        constructor(private _locationService: ng.ILocationService) { }

        public initialise(game: G.Game): void {
            this._locationService.path(game.type.id + "/" + game.id);
        }
    }

    angular
        .module(strategyGameApp)
        .service($urlManager, ["$location", UrlManager]);
}