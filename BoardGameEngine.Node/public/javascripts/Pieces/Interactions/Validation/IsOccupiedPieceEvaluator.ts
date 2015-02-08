module AgileObjects.BoardGameEngine.Pieces {

    export class IsOccupiedPieceEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsOccupiedPieceEvaluator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return subjectPiece.isOccupied();
        }
    }
}