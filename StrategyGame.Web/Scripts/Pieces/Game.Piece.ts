module AgileObjects.StrategyGame.Game {

    export class Piece implements IPiece {

        constructor(
            public id: string,
            public imageSource: string,
            public movementProfile: IPieceMovementProfile) {
        }

        public moving(): void {
            console.log("Piece " + this.id + " moving");
        }

        public moved(): void {
            console.log("Piece " + this.id + " moved");
        }
    }
}