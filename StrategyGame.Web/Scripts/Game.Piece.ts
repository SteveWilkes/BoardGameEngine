module AgileObjects.StrategyGame.Game {

    export class Piece implements IPiece {

        constructor(
            public id: string,
            public imageSource: string,
            public movementProfile: IPieceMovementProfile) {
        }

        width: number;
        height: number;

        public resize(resizeFactor: number): void {
            this.width = Math.floor(defaultPieceWidth * resizeFactor);
            this.height = Math.floor(defaultPieceHeight * resizeFactor);
        }

        public moving(): void {
            console.log("Piece " + this.id + " moving");
        }

        public moved(): void {
            console.log("Piece " + this.id + " moved");
        }
    }
}