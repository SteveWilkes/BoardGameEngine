module AgileObjects.StrategyGame.Game.Boards {
    import Ts = TypeScript;

    export interface IBoardFactory {
        createBoard(boardTypeId: string, numberOfTeams: number, events: EventSet): Board;
    }

    export var boardFactory = "$boardFactory";

    class BoardFactory implements IBoardFactory {
        constructor(private _getBoardTypeQuery: Ts.IGetQuery<BoardType>) { }

        public createBoard(boardTypeId: string, numberOfTeams: number, events: EventSet): Board {
            var boardType = this._getBoardTypeQuery.execute(boardTypeId);
            var board = new Boards.Board(boardType, numberOfTeams, events);

            return board;
        }
    }

    angular
        .module(strategyGameApp)
        .service(boardFactory, [getBoardTypeQuery, BoardFactory]);
}