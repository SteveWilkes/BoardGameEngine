module AgileObjects.BoardGameEngine.Pieces {

    export class IsUnoccupiedLocationEvaluator implements IPieceLocationEvaluator {
        static INSTANCE = new IsUnoccupiedLocationEvaluator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !potentialLocation.isOccupied();
        }
    }
}