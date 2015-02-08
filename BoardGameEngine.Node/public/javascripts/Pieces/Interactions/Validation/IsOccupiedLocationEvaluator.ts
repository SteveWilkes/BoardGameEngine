module AgileObjects.BoardGameEngine.Pieces {

    export class IsOccupiedLocationEvaluator implements IPieceAndLocationEvaluator {
        static INSTANCE = new IsOccupiedLocationEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return targetLocation.isOccupied();
        }
    }
}