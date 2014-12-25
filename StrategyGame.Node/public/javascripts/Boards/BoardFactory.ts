module AgileObjects.StrategyGame.Game.Boards {
    import Ts = TypeScript;

    export interface IBoardFactory {
        createBoard(boardTypeId: string, numberOfTeams: number, events: EventSet): Board;
    }

    export var boardFactory = "$boardFactory";

    class BoardFactory implements IBoardFactory {
        constructor(private _$boardTypeRegistry: IBoardTypeRegistry) { }

        public createBoard(boardTypeId: string, numberOfTeams: number, events: EventSet): Board {
            var boardType = this._$boardTypeRegistry.getBoardType(boardTypeId);
            var board = new Boards.Board(boardType, numberOfTeams, events);

            return board;
        }
    }

    angular
        .module(strategyGameApp)
        .service(boardFactory, [boardTypeRegistry, BoardFactory]);
}