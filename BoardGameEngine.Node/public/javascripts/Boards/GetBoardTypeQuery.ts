module AgileObjects.BoardGameEngine.Boards {
    import Ts = TypeScript;

    export class GetBoardTypeQuery implements Ts.IGetQuery<BoardType> {
        public execute(boardTypeId: string, callback: (err: Error, boardType?: BoardType) => void): void {
            // TODO: Retrieve BoardType from a data store and cache:
            callback(null, new BoardType(
                "1",
                "diamond",
                [
                    new BoardPosition("South", c => c),
                    new BoardPosition("North", Ts.CoordinateTranslatorLibrary.SOUTH_TO_NORTH, true),
                    new BoardPosition("East", c => c),
                    new BoardPosition("West", c => c)
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
                new BoardOrientationTranslator()));
        }
    }
}