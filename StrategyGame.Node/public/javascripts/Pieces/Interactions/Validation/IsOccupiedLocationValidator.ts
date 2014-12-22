module AgileObjects.StrategyGame.Game.Pieces {

    export class IsOccupiedLocationValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return potentialLocation.isOccupied();
        }
    }
}