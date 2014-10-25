module AgileObjects.StrategyGame.Game {

    var squareRootOf2 = Math.sqrt(2);

    export class BoardSizeSet {
        constructor(private _defaults: BoardSizeDefaults, public gridSize: number) {
        }

        public boardSize: number;
        public tileSize: number;
        public pieceWidth: number;
        public pieceHeight: number;

        public recalculate(containerSize: number): void {
            var boardDiagonalSize = containerSize * 0.9;
            var tileDiagonalSize = boardDiagonalSize / this.gridSize;
            var tileOuterSize = Math.floor(tileDiagonalSize / squareRootOf2);
            this.boardSize = tileOuterSize * this.gridSize;
            this.tileSize = tileOuterSize - (this._defaults.tileBorderWidth * 2);
            var resizeFactor = containerSize / this._defaults.containerSize;
            this.pieceWidth = Math.floor(this._defaults.pieceWidth * resizeFactor);
            this.pieceHeight = Math.floor(this._defaults.pieceHeight * resizeFactor);
        }
    }
}