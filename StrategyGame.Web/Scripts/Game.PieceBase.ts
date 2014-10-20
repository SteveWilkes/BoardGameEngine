module AgileObjects.StrategyGame.Game {

    export class PieceBase implements IPiece {
        imageSource: string;
        width: number;
        height: number;

        public resize(resizeFactor: number): void {
            this.width = Math.floor(this.width * resizeFactor);
            this.height = Math.floor(this.height * resizeFactor);
        }
    }
}