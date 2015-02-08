module AgileObjects.BoardGameEngine.Pieces {

    export class AlwaysValidLocationEvaluator implements IPieceAndLocationEvaluator {
        static INSTANCE = new AlwaysValidLocationEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return true;
        }
    }
}