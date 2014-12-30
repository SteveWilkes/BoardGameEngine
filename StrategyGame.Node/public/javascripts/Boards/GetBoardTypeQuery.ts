module AgileObjects.StrategyGame.Game.Boards {
    import Ts = TypeScript;

    export var getBoardTypeQuery = "$getBoardTypeQuery";

    class GetBoardTypeQuery implements Ts.IGetQuery<BoardType> {
        public get(boardTypeId: string): BoardType {
            // TODO: Retrieve BoardType from a data store and cache:
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
        .service(getBoardTypeQuery, [GetBoardTypeQuery]);
}