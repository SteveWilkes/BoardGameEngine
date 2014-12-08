module AgileObjects.StrategyGame.Game {

    export class BoardSizeDefaults {
        constructor(
            public boardSize: number,
            public pieceWidth: number,
            public pieceHeight: number,
            public tileBorderWidth: number) {
        }
    }
}