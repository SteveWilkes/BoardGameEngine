module AgileObjects.StrategyGame.Game.Boards {

    export class BoardSizeDefaults {
        static instance = new BoardSizeDefaults(950, 50, 80, 2);

        constructor(
            public boardSize: number,
            public pieceWidth: number,
            public pieceHeight: number,
            public tileBorderWidth: number) {
        }
    }
}