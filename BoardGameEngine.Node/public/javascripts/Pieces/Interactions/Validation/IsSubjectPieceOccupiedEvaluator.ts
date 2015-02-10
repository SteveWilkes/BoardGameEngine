module AgileObjects.BoardGameEngine.Pieces {

    export class IsSubjectPieceOccupiedEvaluator implements IPieceEvaluator, IPieceAndLocationEvaluator {
        static INSTANCE = new IsSubjectPieceOccupiedEvaluator();

        public evaluate(subjectPiece: Piece, targetLocation?: IPieceLocation): boolean {
            return subjectPiece.isOccupied();
        }
    }
}