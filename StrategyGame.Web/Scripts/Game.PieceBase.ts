module AgileObjects.StrategyGame.Game {

    export class PieceBase implements IPiece {

        constructor(public id: string, public imageSource: string) {
        }

        width: number;
        height: number;

        public resize(resizeFactor: number): void {
            this.width = Math.floor(defaultPieceWidth * resizeFactor);
            this.height = Math.floor(defaultPieceHeight * resizeFactor);
        }
    }
}