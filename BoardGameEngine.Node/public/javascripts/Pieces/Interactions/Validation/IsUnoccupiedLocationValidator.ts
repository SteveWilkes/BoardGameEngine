module AgileObjects.BoardGameEngine.Pieces {

    export class IsUnoccupiedLocationValidator implements IPieceLocationValidator {
        static INSTANCE = new IsUnoccupiedLocationValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !potentialLocation.isOccupied();
        }
    }
}