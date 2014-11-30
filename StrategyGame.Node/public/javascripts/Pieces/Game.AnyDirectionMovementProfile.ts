module AgileObjects.StrategyGame.Game {

    export class AnyDirectionMovementProfile implements IPieceMovementProfile {
        constructor(private _allowedDistance: number, private _movementFilters: Array<IPieceMovementFilter>) {
        }

        public getValidDestinations(origin: IPieceLocation, allLocations: IPieceLocationDictionary): Array<IPieceLocation> {
            var destinations = [
                allLocations[origin.position.left(this._allowedDistance).signature],
                allLocations[origin.position.upLeft(this._allowedDistance).signature],
                allLocations[origin.position.up(this._allowedDistance).signature],
                allLocations[origin.position.upRight(this._allowedDistance).signature],
                allLocations[origin.position.right(this._allowedDistance).signature],
                allLocations[origin.position.downRight(this._allowedDistance).signature],
                allLocations[origin.position.down(this._allowedDistance).signature],
                allLocations[origin.position.downLeft(this._allowedDistance).signature]
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