module AgileObjects.BoardGameEngine.Pieces {

    export class IsUnoccupiedPieceEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsUnoccupiedPieceEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return !subjectPiece.isOccupied();
        }
    }
}