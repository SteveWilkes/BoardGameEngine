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
            gameCoordinator: IClientComponent,
            public displayManager: B.BoardDisplayManager) {

            this._components = new Array<IClientComponent>(
                urlManager,
                pieceInteractionMonitorService,
                gameEventPropogator,
                gameCoordinator,
                displayManager);
        }

        public initialise(game: G.Game): void {
            for (var i = 0; i < this._components.length; i++) {
                this._components[i].initialise(game);
            }
        }
    }

    var components = new Array<any>(
        $urlManager,
        Pieces.$pieceInteractionMonitorService,
        $gameEventPropogator,
        Games.$clientGameCoordinator,
        Boards.$boardDisplayManager);

    angular
        .module(strategyGameApp)
        .service($clientComponentSet, components.concat([CompositeClientComponentSet]));
}