module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceDestinationFilter {
        filter(potentialDestinations: Array<IPieceLocation>, movingPiece: IPiece): void;
    }

    export class OnlyDroppableLocationsPieceDestinationFilter implements IPieceDestinationFilter {
        public filter(potentialDestinations: Array<IPieceLocation>, movingPiece: IPiece): void {
            for (var i = (potentialDestinations.length - 1); i >= 0; i--) {
                if (potentialDestinations[i].isOccupied() &&
                    !potentialDestinations[i].piece.pieceDropHandler.canDrop(movingPiece)) {
                    potentialDestinations.splice(i, 1);
                }
            }
        }
    }

    export class OnlyOccupiedLocationsPieceDestinationFilter implements IPieceDestinationFilter {
        public filter(potentialDestinations: Array<IPieceLocation>, movingPiece: IPiece): void {
            for (var i = (potentialDestinations.length - 1); i >= 0; i--) {
                if (!potentialDestinations[i].isOccupied() ||
                    !potentialDestinations[i].piece.pieceDropHandler.canDrop(movingPiece)) {
                    potentialDestinations.splice(i, 1);
                }
            }
        }
    }
}