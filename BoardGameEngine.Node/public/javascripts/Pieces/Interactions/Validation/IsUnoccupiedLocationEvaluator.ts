module AgileObjects.BoardGameEngine.Pieces {

    export class IsUnoccupiedLocationEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsUnoccupiedLocationEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return !targetLocation.isOccupied();
        }
    }
}