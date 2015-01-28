module AgileObjects.StrategyGame.Ui {

    export interface IGameUiComponent {
        initialise(game: Games.Game): void;
    }

    export var $gameUiComponentSet = "$gameUiComponentSet";

    "ClientOnly";
    class CompositeGameUiComponent implements IGameUiComponent {
        private _components: Array<IGameUiComponent>;

        constructor(
            pieceInteractionMonitorService: IGameUiComponent,
            gameEventPropogator: IGameUiComponent,
            gameCoordinationClient: IGameUiComponent,
            boardDisplayManager: IGameUiComponent) {

            this._components = new Array<IGameUiComponent>(
                pieceInteractionMonitorService,
                gameEventPropogator,
                gameCoordinationClient,
                boardDisplayManager);
        }

        public initialise(game: Games.Game): void {
            for (var i = 0; i < this._components.length; i++) {
                this._components[i].initialise(game);
            }
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameUiComponentSet, [
            Pieces.$pieceInteractionMonitorService,
            $gameEventPropogator,
            Status.$clientGameCoordinator,
            Boards.$boardDisplayManager,
            CompositeGameUiComponent]);
}