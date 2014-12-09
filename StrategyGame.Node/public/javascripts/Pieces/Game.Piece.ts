module AgileObjects.StrategyGame.Game {

    export class Piece implements IPiece {

        constructor(
            public id: string,
            public imageSource: string,
            public movementProfile: IPieceMovementProfile) {
        }

        public attachedPiece: IPiece;

        public add(piece: IPiece): void {
            this.attachedPiece = piece;
        }
    }
}