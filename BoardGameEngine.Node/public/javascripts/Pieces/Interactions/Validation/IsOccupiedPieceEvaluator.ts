module AgileObjects.BoardGameEngine.Pieces {

    export class IsOccupiedPieceEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsOccupiedPieceEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return subjectPiece.isOccupied();
        }
    }
}