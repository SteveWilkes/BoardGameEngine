module AgileObjects.BoardGameEngine.Ui {

    export interface IGameUiComponent {
        initialise(game: G.Game): void;
    }

    export var $gameUiComponentSet = "$gameUiComponentSet";

    "ClientOnly";
    export class CompositeGameUiComponent implements IGameUiComponent {
        private _components: Array<IGameUiComponent>;

        constructor(
            urlManager: IGameUiComponent,
            pieceInteractionMonitorService: IGameUiComponent,
            gameEventPropogator: IGameUiComponent,
            gameCoordinationClient: IGameUiComponent,
            public displayManager: B.BoardDisplayManager) {

            this._components = new Array<IGameUiComponent>(
                urlManager,
                pieceInteractionMonitorService,
                gameEventPropogator,
                gameCoordinationClient,
                displayManager);
        }

        public initialise(game: G.Game): void {
            for (var i = 0; i < this._components.length; i++) {
                this._components[i].initialise(game);
            }
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameUiComponentSet, [
        $urlManager,
        Pieces.$pieceInteractionMonitorService,
        $gameEventPropogator,
        Status.$clientGameCoordinator,
        Boards.$boardDisplayManager,
        CompositeGameUiComponent]);
}