module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceDestinationFilter {
        filter(movingPiece: IPiece, possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation>;
    }

    export class OnlyDroppableLocationsPieceDestinationFilter implements IPieceDestinationFilter {
        public filter(movingPiece: IPiece, possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
            var droppableDestinations = new Array<IPieceLocation>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                if (!possibleDestinations[i].isOccupied() ||
                    possibleDestinations[i].piece.pieceDropHandler.canDrop(movingPiece)) {
                    droppableDestinations.push(possibleDestinations[i]);
                }
            }
            return droppableDestinations;
        }
    }

    export class OnlyOccupiedLocationsPieceDestinationFilter implements IPieceDestinationFilter {
        public filter(movingPiece: IPiece, possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
            var occupiedDestinations = new Array<IPieceLocation>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                if (possibleDestinations[i].isOccupied() &&
                    possibleDestinations[i].piece.pieceDropHandler.canDrop(movingPiece)) {
                    occupiedDestinations.push(possibleDestinations[i]);
                }
            }
            return occupiedDestinations;
        }
    }
}