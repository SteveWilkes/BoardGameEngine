module AgileObjects.StrategyGame.Game {

    export class BoardTypeRegistry {
        public diamond = new BoardType(
            [
                new BoardPosition("North", (c: Coordinates) => c),
                new BoardPosition("East", (c: Coordinates) => c),
                new BoardPosition("South", (c: Coordinates, gridSize: number) => coordinatesRegistry.get(gridSize - (c.row - 1), c.column), true),
                new BoardPosition("West", (c: Coordinates) => c)
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

    export var boardTypeRegistry = new BoardTypeRegistry();
}