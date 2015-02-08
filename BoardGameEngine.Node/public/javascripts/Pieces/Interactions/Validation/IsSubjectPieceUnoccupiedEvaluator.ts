module AgileObjects.BoardGameEngine.Pieces {

    export class IsSubjectPieceUnoccupiedEvaluator implements IPieceEvaluator, IPieceAndLocationEvaluator {
        static INSTANCE = new IsSubjectPieceUnoccupiedEvaluator();

        public isValid(subjectPiece: Piece, targetLocation?: IPieceLocation): boolean {
            return !subjectPiece.isOccupied();
        }
    }
}