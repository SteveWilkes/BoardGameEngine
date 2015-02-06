module AgileObjects.BoardGameEngine.Pieces {

    export class LocationIsOccupiedValidator implements IPieceLocationValidator {
        static INSTANCE = new LocationIsOccupiedValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return potentialLocation.isOccupied();
        }
    }
}