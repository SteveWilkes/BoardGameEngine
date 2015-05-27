module AgileObjects.BoardGameEngine.Pieces {

    export var $pieceInteractionMonitorService = "$pieceInteractionMonitorService";

    "ClientOnly"
    class PieceInteractionMonitorService implements Ui.IGameUiComponent {
        constructor(private _timeoutService: ng.ITimeoutService) { }

        public initialise(game: Games.Game): void {
            // ReSharper disable once WrongExpressionStatement
            new PieceInteractionMonitor(this._timeoutService, game);
        }
    }

    angular
        .module(strategyGameApp)
        .service($pieceInteractionMonitorService, ["$timeout", PieceInteractionMonitorService]);
}