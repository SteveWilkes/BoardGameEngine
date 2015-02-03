module AgileObjects.BoardGameEngine.Pieces {

    export class IsOccupiedLocationValidator implements IPieceLocationValidator {
        static INSTANCE = new IsOccupiedLocationValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return potentialLocation.isOccupied();
        }
    }
}