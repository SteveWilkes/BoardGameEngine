module AgileObjects.BoardGameEngine.Pieces {

    export class IsOccupiedLocationEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsOccupiedLocationEvaluator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return potentialLocation.isOccupied();
        }
    }
}