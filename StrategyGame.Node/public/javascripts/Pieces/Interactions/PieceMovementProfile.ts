module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementProfile {
        constructor(
            private _destinationCalculators: Array<RelatedLocationCalculator>,
            private _locationAdapter?: (location: IPieceLocation) => Array<IPieceLocation>) { }

        public setLocations(allLocations): void {
            for (var i = 0; i < this._destinationCalculators.length; i++) {
                this._destinationCalculators[i].setLocations(allLocations);
            }
        }

        public getDestinations(origin: IPieceLocation): Array<IPieceLocation> {
            var destinations = new Array<IPieceLocation>();
            for (var i = 0; i < this._destinationCalculators.length; i++) {
                var possibleDestinations = this._destinationCalculators[i].calculateLocations(origin);
                if (this._locationAdapter !== undefined) {
                    var allAdaptedDestinations = new Array<IPieceLocation>();
                    for (var j = 0; j < possibleDestinations.length; j++) {
                        var adaptedDestinations = this._locationAdapter(possibleDestinations[j]);
                        allAdaptedDestinations = allAdaptedDestinations.concat(adaptedDestinations);
                    }
                    possibleDestinations = allAdaptedDestinations;
                }
                destinations = destinations.concat(possibleDestinations);
            }
            return destinations;
        }
    }
}