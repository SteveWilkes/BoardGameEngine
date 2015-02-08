module AgileObjects.BoardGameEngine.Pieces {

    export class AlwaysValidLocationEvaluator implements IPieceEvaluator, IPieceAndLocationEvaluator {
        static INSTANCE = new AlwaysValidLocationEvaluator()

        public isValid(subjectPiece: Piece, targetLocation?: IPieceLocation): boolean {
            return true;
        }
    }
}