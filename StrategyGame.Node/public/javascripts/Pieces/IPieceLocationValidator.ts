module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationValidator {
        isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean
    }

    export class OnlyDroppableLocationsValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, movingPiece: Piece): boolean {
            return !potentialLocation.isOccupied() ||
                potentialLocation.piece.pieceDropHandler.canDrop(movingPiece);
        }
    }

    export class OnlyOccupiedLocationsValidator implements IPieceLocationValidator {
        public isValid(potentialLocation: IPieceLocation, movingPiece: Piece): boolean {
            return potentialLocation.isOccupied() &&
                potentialLocation.piece.pieceDropHandler.canDrop(movingPiece);
        }
    }
}