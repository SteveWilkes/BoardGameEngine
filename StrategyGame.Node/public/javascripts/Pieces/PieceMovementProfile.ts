module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementProfile {
        private _locations: IPieceLocationDictionary;

        constructor(
            private _potentialDestinationCalculators: Array<Array<PieceMovementCalculator>>,
            private _destinationFilters: Array<IPieceDestinationFilter>) {
        }

        public setLocations(locations: IPieceLocationDictionary): void {
            this._locations = locations;
        }

        public getValidDestinations(origin: IPieceLocation): Array<IPieceLocation> {
            var destinations = this._getDestinations(origin);
            for (var i = 0; i < this._destinationFilters.length; i++) {
                this._destinationFilters[i].filter(destinations, origin.piece);
            }
            return destinations;
        }

        private _getDestinations(origin: IPieceLocation): Array<IPieceLocation> {
            var destinations = new Array<IPieceLocation>();
            for (var i = 0; i < this._potentialDestinationCalculators.length; i++) {
                var potentialDestinationCalculator = this._potentialDestinationCalculators[i];
                var destinationCoordinates = origin.coordinates;
                for (var j = 0; j < potentialDestinationCalculator.length; j++) {
                    destinationCoordinates = potentialDestinationCalculator[j].applyMovement(destinationCoordinates);
                }
                var destination = this._locations[destinationCoordinates.signature];
                if (destination !== undefined) {
                    destinations.push(destination);
                }
            }
            return destinations;
        }
    }
}