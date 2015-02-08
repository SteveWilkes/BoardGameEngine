module AgileObjects.BoardGameEngine.Pieces {

    export class IsUnoccupiedPieceEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsUnoccupiedPieceEvaluator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !subjectPiece.isOccupied();
        }
    }
}