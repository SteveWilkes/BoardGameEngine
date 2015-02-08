module AgileObjects.BoardGameEngine.Pieces {

    export class IsTargetLocationUnoccupiedEvaluator implements IPieceAndLocationEvaluator {
        static INSTANCE = new IsTargetLocationUnoccupiedEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return !targetLocation.isOccupied();
        }
    }
}