module AgileObjects.BoardGameEngine.Pieces {

    export class PieceInteractionContext {
        constructor(public startingLocation: IPieceLocation) {
            this.piece = this.startingLocation.piece;
        }

        public piece: Piece
        public location: IPieceLocation;
    }
}