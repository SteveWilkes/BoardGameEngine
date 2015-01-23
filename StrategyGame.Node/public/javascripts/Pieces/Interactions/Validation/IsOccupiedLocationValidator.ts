module AgileObjects.StrategyGame.Pieces {

    export class IsOccupiedLocationValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return potentialLocation.isOccupied();
        }
    }
}