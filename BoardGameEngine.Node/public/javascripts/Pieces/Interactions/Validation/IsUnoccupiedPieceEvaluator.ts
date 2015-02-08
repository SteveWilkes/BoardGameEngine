module AgileObjects.BoardGameEngine.Pieces {

    export class IsUnoccupiedPieceEvaluator implements IPieceAndLocationEvaluator {
        static INSTANCE = new IsUnoccupiedPieceEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return !subjectPiece.isOccupied();
        }
    }
}