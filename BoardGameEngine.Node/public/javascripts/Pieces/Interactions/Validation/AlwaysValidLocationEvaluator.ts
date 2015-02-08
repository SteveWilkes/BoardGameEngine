module AgileObjects.BoardGameEngine.Pieces {

    export class AlwaysValidLocationEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new AlwaysValidLocationEvaluator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return true;
        }
    }
}