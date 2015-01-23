module AgileObjects.StrategyGame.Ui {

    export interface IGameUiComponent {
        gameCreated(game: Games.Game): void;
    }

    export var $gameUiComponentSet = "$gameUiComponentSet";

    "ClientOnly";
    class CompositeGameUiComponent implements IGameUiComponent {
        private _components: Array<IGameUiComponent>;

        constructor(
            pieceInteractionMonitorService: IGameUiComponent,
            gameEventPropogator: IGameUiComponent,
            gameCoordinationClient: IGameUiComponent) {

            this._components = new Array<IGameUiComponent>(
                pieceInteractionMonitorService,
                gameEventPropogator,
                gameCoordinationClient);
        }

        public gameCreated(game: Games.Game): void {
            for (var i = 0; i < this._components.length; i++) {
                this._components[i].gameCreated(game);
            }
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameUiComponentSet, [
            Pieces.$pieceInteractionMonitorService,
            $gameEventPropogator,
            Status.$gameCoordinationClient,
            CompositeGameUiComponent]);
}