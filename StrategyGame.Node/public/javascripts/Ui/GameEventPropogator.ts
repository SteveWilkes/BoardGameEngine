module AgileObjects.StrategyGame.Ui {

    export var $gameEventPropogator = "$gameEventPropogator";

    "ClientOnly";
    class GameEventPropogator implements IGameUiComponent {
        constructor(private _eventPropogator: Angular.Services.IEventPropogationService) { }

        public initialise(game: Games.Game): void {
            this._eventPropogator.propogate(
                game.events.pieceAttacked,
                "attack",
                attack => attack.target.coordinates.signature);
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameEventPropogator, [Angular.Services.$eventPropogator, GameEventPropogator]);
}
