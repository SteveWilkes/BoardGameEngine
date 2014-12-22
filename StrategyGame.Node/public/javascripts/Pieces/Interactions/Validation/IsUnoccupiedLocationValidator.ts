module AgileObjects.StrategyGame.Game.Pieces {

    export class IsUnoccupiedLocationValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            return !potentialLocation.isOccupied();
        }
    }
}