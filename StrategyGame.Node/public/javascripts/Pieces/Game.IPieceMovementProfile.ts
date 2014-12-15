module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceMovementProfile {
        setLocations(locations: IPieceLocationDictionary): void;
        getValidDestinations(origin: IPieceLocation): Array<IPieceLocation>;
    }

    export class OnlyValidDestinationsMovementProfile {
        protected locations: IPieceLocationDictionary;

        public setLocations(locations: IPieceLocationDictionary): void {
            this.locations = locations;
        }

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

        public getValidDestinations(origin: IPieceLocation): Array<IPieceLocation> {
            var destinations = this.filterToOnlyValid([
                this.locations[origin.coordinates.left(this._allowedDistance).signature],
                this.locations[origin.coordinates.upLeft(this._allowedDistance).signature],
                this.locations[origin.coordinates.up(this._allowedDistance).signature],
                this.locations[origin.coordinates.upRight(this._allowedDistance).signature],
                this.locations[origin.coordinates.right(this._allowedDistance).signature],
                this.locations[origin.coordinates.downRight(this._allowedDistance).signature],
                this.locations[origin.coordinates.down(this._allowedDistance).signature],
                this.locations[origin.coordinates.downLeft(this._allowedDistance).signature]
            ]);
            for (var i = 0; i < this._movementFilters.length; i++) {
                destinations = this._movementFilters[i].filter(origin.piece, destinations);
            }
            return destinations;
        }
    }
}