module AgileObjects.BoardGameEngine.Ui {

    export interface IClientComponent {
        initialise(game: G.Game): void;
    }

    export var $clientComponentSet = "$clientComponentSet";

    "ClientOnly";
    export class CompositeClientComponentSet implements IClientComponent {
        private _components: Array<IClientComponent>;

        constructor(
            public urlManager: UrlManager,
            pieceInteractionMonitorService: IClientComponent,
            gameEventPropogator: IClientComponent,
            gameCoordinationClient: IClientComponent,
            public displayManager: B.BoardDisplayManager) {

            this._components = new Array<IClientComponent>(
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
        .service($clientComponentSet, [
        $urlManager,
        Pieces.$pieceInteractionMonitorService,
        $gameEventPropogator,
        Status.$clientGameCoordinator,
        Boards.$boardDisplayManager,
        CompositeClientComponentSet]);
}