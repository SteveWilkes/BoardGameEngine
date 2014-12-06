module AgileObjects.StrategyGame.Game {

    export class AnyDirectionMovementProfile implements IPieceMovementProfile {
        constructor(private _allowedDistance: number, private _movementFilters: Array<IPieceMovementFilter>) {
        }

        public getValidDestinations(origin: IPieceLocation, allLocations: IPieceLocationDictionary): Array<IPieceLocation> {
            var destinations = [
                allLocations[origin.coordinates.left(this._allowedDistance).signature],
                allLocations[origin.coordinates.upLeft(this._allowedDistance).signature],
                allLocations[origin.coordinates.up(this._allowedDistance).signature],
                allLocations[origin.coordinates.upRight(this._allowedDistance).signature],
                allLocations[origin.coordinates.right(this._allowedDistance).signature],
                allLocations[origin.coordinates.downRight(this._allowedDistance).signature],
                allLocations[origin.coordinates.down(this._allowedDistance).signature],
                allLocations[origin.coordinates.downLeft(this._allowedDistance).signature]
            ];
            for (var i = 0; i < this._movementFilters.length; i++) {
                destinations = this._movementFilters[i].filter(destinations);
            }
            return destinations;
        }
    }

    export interface IPieceMovementFilter {
        filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation>;
    }

    export class OnlyValidLocationsPieceMovementFilter implements IPieceMovementFilter {
        filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
            var validDestinations = new Array<IPieceLocation>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                if (possibleDestinations[i] !== undefined) {
                    validDestinations.push(possibleDestinations[i]);
                }
            }
            return validDestinations;
        }
    }

    export class OnlyEmptyLocationsPieceMovementFilter implements IPieceMovementFilter {
        filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
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
        filter(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
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