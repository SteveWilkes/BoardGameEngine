module AgileObjects.BoardGameEngine.Pieces {

    export class IsTargetLocationOccupiedEvaluator implements IPieceAndLocationEvaluator {
        static INSTANCE = new IsTargetLocationOccupiedEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return targetLocation.isOccupied();
        }
    }
}