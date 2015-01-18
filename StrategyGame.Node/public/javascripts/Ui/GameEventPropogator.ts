module AgileObjects.StrategyGame.Game.Ui {

    export var $gameEventPropogator = "$gameEventPropogator";

    class GameEventPropogator implements IGameUiComponent {
        constructor(private _eventPropogator: Angular.Services.IEventPropogationService) { }

        public gameCreated(game: Game): void {
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
