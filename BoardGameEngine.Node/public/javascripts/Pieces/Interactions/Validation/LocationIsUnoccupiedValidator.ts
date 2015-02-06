module AgileObjects.BoardGameEngine.Pieces {

    export class LocationIsUnoccupiedValidator implements IPieceLocationValidator {
        static INSTANCE = new LocationIsUnoccupiedValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !potentialLocation.isOccupied();
        }
    }
}