module AgileObjects.BoardGameEngine.Pieces {

    export class AlwaysValidLocationValidator implements IPieceLocationValidator {
        static INSTANCE = new AlwaysValidLocationValidator();

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return true;
        }
    }
}