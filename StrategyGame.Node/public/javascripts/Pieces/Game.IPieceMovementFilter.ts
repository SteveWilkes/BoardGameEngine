module AgileObjects.StrategyGame.Game {

    export interface IPieceMovementFilter {
        filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation>;
    }

    export class OnlyEmptyLocationsPieceMovementFilter implements IPieceMovementFilter {
        public filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
            var emptyDestinations = new Array<IPieceLocation>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                if (!possibleDestinations[i].isOccupied()) {
                    emptyDestinations.push(possibleDestinations[i]);
                }
            }
            return emptyDestinations;
        }
    }

    export class OnlyOccupiedLocationsPieceMovementFilter implements IPieceMovementFilter {
        public filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
            var occupiedDestinations = new Array<IPieceLocation>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                if (possibleDestinations[i].isOccupied()) {
                    occupiedDestinations.push(possibleDestinations[i]);
                }
            }
            return occupiedDestinations;
        }
    }
}