module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(public board: Board, public sizeManager: BoardSizeManager, public events: EventSet) {
            this.sizeManager.resize(this.board);
        }
    }
} 