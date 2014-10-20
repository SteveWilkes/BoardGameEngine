module AgileObjects.StrategyGame.Game {

    export class BoardSettings {
        constructor(public gridSize: number, public tileBorderWidth: number) {
            this.tileSizeFactor = (gridSize * 2) - Math.floor(gridSize / 4);
            this.resize(defaultContainerSize);
        }

        public tileSizeFactor: number;
        public pieceWidth: number;
        public pieceHeight: number;

        public resize(containerSize: number): void {
            var resizeFactor = containerSize / defaultContainerSize;
            this.pieceWidth = Math.floor(defaultPieceWidth * resizeFactor);
            this.pieceHeight = Math.floor(defaultPieceHeight * resizeFactor);
        }
    }
}