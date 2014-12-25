module AgileObjects.StrategyGame.Game.Boards {
    import Ts = TypeScript;

    export interface IBoardTypeRegistry {
        getBoardType(boardTypeId: string): BoardType;
    }

    export var boardTypeRegistry = "$boardTypeRegistry";

    class BoardTypeRegistry implements IBoardTypeRegistry {
        public getBoardType(boardTypeId: string): BoardType {
            // TODO: Load BoardType using a Query + cache
            return new BoardType(
                "1",
                "diamond",
                [
                    new BoardPosition("North", (c: Ts.Coordinates) => c),
                    new BoardPosition("East", (c: Ts.Coordinates) => c),
                    new BoardPosition("South", (c: Ts.Coordinates, gridSize: number) => Ts.coordinatesRegistry.get(gridSize - (c.row - 1), c.column), true),
                    new BoardPosition("West", (c: Ts.Coordinates) => c)
                ],
                [
                    new BoardRowConfig([false, false, false, false, true, false, false, false, false]),
                    new BoardRowConfig([false, false, false, true, true, true, false, false, false]),
                    new BoardRowConfig([false, false, true, true, true, true, true, false, false]),
                    new BoardRowConfig([false, true, true, true, true, true, true, true, false]),
                    new BoardRowConfig([true, true, true, true, true, true, true, true, true]),
                    new BoardRowConfig([false, true, true, true, true, true, true, true, false]),
                    new BoardRowConfig([false, false, true, true, true, true, true, false, false]),
                    new BoardRowConfig([false, false, false, true, true, true, false, false, false]),
                    new BoardRowConfig([false, false, false, false, true, false, false, false, false])
                ],
                new BoardOrientationTranslator());
        }
    }

    angular
        .module(strategyGameApp)
        .service(boardTypeRegistry, [BoardTypeRegistry]);
}