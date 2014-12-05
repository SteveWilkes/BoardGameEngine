module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public sizeManager: BoardSizeManager,
            public board: Board,
            private _turnManager: TurnManager,
            public events: EventSet) {

            this.sizeManager.resize(this.board);
        }
    }
}