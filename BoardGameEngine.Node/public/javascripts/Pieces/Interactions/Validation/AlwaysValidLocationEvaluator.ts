module AgileObjects.BoardGameEngine.Pieces {

    export class AlwaysValidLocationEvaluator implements IPieceEvaluator, IPieceAndLocationEvaluator {
        static INSTANCE = new AlwaysValidLocationEvaluator()

        public evaluate(subjectPiece: Piece, targetLocation?: IPieceLocation): boolean {
            return true;
        }
    }
}