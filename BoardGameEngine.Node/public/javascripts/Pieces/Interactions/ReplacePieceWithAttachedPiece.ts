module AgileObjects.BoardGameEngine.Pieces {

    export class ReplacePieceWithAttachedPiece implements ITakenPieceProcessor {
        public process(piece: Piece, originalPieceLocation: IPieceLocation): void {
            if (piece.isOccupied()) {
                piece.movePieceTo(originalPieceLocation);
            }
        }
    }
}