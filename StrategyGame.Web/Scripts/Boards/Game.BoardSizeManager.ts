module AgileObjects.StrategyGame.Game {

    var squareRootOf2 = Math.sqrt(2);

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
            var boardDiagonalSize = containerSize * 0.9;
            var tileDiagonalSize = boardDiagonalSize / board.gridSize;
            var tileOuterSize = Math.floor(tileDiagonalSize / squareRootOf2);
            this.boardSize = tileOuterSize * board.gridSize;
            this.tileSize = tileOuterSize - (this._defaults.tileBorderWidth * 2);
            var resizeFactor = containerSize / this._defaults.containerSize;
            this.pieceWidth = Math.floor(this._defaults.pieceWidth * resizeFactor);
            this.pieceHeight = Math.floor(this._defaults.pieceHeight * resizeFactor);

            return true;
        }
    }
}