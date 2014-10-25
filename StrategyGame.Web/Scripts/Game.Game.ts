module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(public board: Board, public sizeManager: BoardSizeManager) {
            this.sizeManager.resize(this.board);
        }
    }
} 