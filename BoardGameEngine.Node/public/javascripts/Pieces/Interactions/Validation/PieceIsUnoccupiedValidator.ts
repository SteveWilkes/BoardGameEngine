module AgileObjects.BoardGameEngine.Pieces {

    export class PieceIsUnoccupiedValidator implements IPieceLocationValidator {
        static INSTANCE = new PieceIsUnoccupiedValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !subjectPiece.isOccupied();
        }
    }
}