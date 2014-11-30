module AgileObjects.StrategyGame.Game {

    export class BoardSizeManager {
        constructor(private _defaults: BoardSizeDefaults, private _container: BoardContainer, events: EventSet) {
            events.containerResized.subscribe((board: Board) => this.resize(board));
        }

        public boardSize: number;
        public tileSize: number;
        public pieceWidth: number;
        public pieceHeight: number;

        public resize(board: Board): boolean {
            if (board === undefined) { return false; }
            var containerSize = this._container.getSize();
            this.boardSize = containerSize * 0.9;
            var tileOuterSize = Math.floor(this.boardSize / board.type.gridSize);
            this.tileSize = tileOuterSize - (this._defaults.tileBorderWidth * 2);
            var resizeFactor = containerSize / this._defaults.containerSize;
            this.pieceWidth = Math.floor(this._defaults.pieceWidth * resizeFactor);
            this.pieceHeight = Math.floor(this._defaults.pieceHeight * resizeFactor);

            return true;
        }
    }
}