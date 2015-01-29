﻿module AgileObjects.BoardGameEngine.Boards {
    import Ts = TypeScript;

    export class GetBoardTypeQuery implements Ts.IGetQuery<BoardType> {
        public execute(boardTypeId: string): BoardType {
            // TODO: Retrieve BoardType from a data store and cache:
            return new BoardType(
                "1",
                "diamond",
                [
                    new BoardPosition("South", (c: Ts.Coordinates) => c),
                    new BoardPosition("North", Ts.CoordinateTranslatorRegistry.SOUTH_TO_NORTH, true),
                    new BoardPosition("East", (c: Ts.Coordinates) => c),
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
}