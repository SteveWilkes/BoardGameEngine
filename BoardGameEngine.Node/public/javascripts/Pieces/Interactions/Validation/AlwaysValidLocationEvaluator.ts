module AgileObjects.BoardGameEngine.Pieces {

    export class AlwaysValidLocationEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new AlwaysValidLocationEvaluator();

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            return true;
        }
    }
}