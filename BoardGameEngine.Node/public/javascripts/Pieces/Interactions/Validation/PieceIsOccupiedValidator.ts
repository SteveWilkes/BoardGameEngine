module AgileObjects.BoardGameEngine.Pieces {

    export class PieceIsOccupiedValidator implements IPieceLocationValidator {
        static INSTANCE = new PieceIsOccupiedValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return subjectPiece.isOccupied();
        }
    }
}