module AgileObjects.StrategyGame.Game {

    export class Piece implements IPiece {

        constructor(
            public id: string,
            public imageSource: string,
            public movementProfile: IPieceMovementProfile) {
        }

        width: number;
        height: number;

        public resize(sizeSet: BoardSizeSet): void {
            this.width = sizeSet.pieceWidth;
            this.height = sizeSet.pieceHeight;
        }

        public moving(): void {
            console.log("Piece " + this.id + " moving");
        }

        public moved(): void {
            console.log("Piece " + this.id + " moved");
        }
    }
}