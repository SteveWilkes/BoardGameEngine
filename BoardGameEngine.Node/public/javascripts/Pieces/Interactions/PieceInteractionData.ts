module AgileObjects.BoardGameEngine.Pieces {

    export class PieceInteractionData {
        constructor(public startingLocation: IPieceLocation) {
            this.piece = this.startingLocation.piece;
        }

        public piece: Piece
        public location: IPieceLocation;
    }
}