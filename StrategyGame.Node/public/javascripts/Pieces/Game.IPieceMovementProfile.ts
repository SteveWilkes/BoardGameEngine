module AgileObjects.StrategyGame.Game {

    export interface IPieceMovementProfile {
        getValidDestinations(origin: IPieceLocation, allLocations: IPieceLocationDictionary): Array<IPieceLocation>;
    }

    export class OnlyValidDestinationsMovementProfile {
        protected filterToOnlyValid(possibleDestinations: Array<IPieceLocation>): Array<IPieceLocation> {
            var validDestinations = new Array<IPieceLocation>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                if (possibleDestinations[i] !== undefined) {
                    validDestinations.push(possibleDestinations[i]);
                }
            }
            return validDestinations;
        }
    }

    export class AnyDirectionMovementProfile
        extends OnlyValidDestinationsMovementProfile
        implements IPieceMovementProfile {

        constructor(private _allowedDistance: number, private _movementFilters: Array<IPieceDestinationFilter>) {
            super();
        }

        public getValidDestinations(origin: IPieceLocation, allLocations: IPieceLocationDictionary): Array<IPieceLocation> {
            var destinations = this.filterToOnlyValid([
                allLocations[origin.coordinates.left(this._allowedDistance).signature],
                allLocations[origin.coordinates.upLeft(this._allowedDistance).signature],
                allLocations[origin.coordinates.up(this._allowedDistance).signature],
                allLocations[origin.coordinates.upRight(this._allowedDistance).signature],
                allLocations[origin.coordinates.right(this._allowedDistance).signature],
                allLocations[origin.coordinates.downRight(this._allowedDistance).signature],
                allLocations[origin.coordinates.down(this._allowedDistance).signature],
                allLocations[origin.coordinates.downLeft(this._allowedDistance).signature]
            ]);
            for (var i = 0; i < this._movementFilters.length; i++) {
                destinations = this._movementFilters[i].filter(origin.piece, destinations);
            }
            return destinations;
        }
    }
}