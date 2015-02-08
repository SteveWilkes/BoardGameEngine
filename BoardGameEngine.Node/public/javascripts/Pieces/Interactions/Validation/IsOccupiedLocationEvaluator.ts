module AgileObjects.BoardGameEngine.Pieces {

    export class IsOccupiedLocationEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsOccupiedLocationEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return targetLocation.isOccupied();
        }
    }
}