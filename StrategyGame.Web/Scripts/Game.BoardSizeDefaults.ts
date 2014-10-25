module AgileObjects.StrategyGame.Game {

    export class BoardSizeDefaults {
        constructor(
            public containerSize: number,
            public pieceWidth: number,
            public pieceHeight: number,
            public tileBorderWidth: number) {
        }

        public tileToPieceRatio: number;
    }
}