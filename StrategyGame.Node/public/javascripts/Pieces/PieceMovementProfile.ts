module AgileObjects.StrategyGame.Game.Pieces {

    export class PotentialMovementSegment {
        constructor(private _directionFunctionName: string, private _distance: number) { }

        public applyMovementSegment(startingPoint: TypeScript.Coordinates): TypeScript.Coordinates {
            return startingPoint[this._directionFunctionName](this._distance);
        }
    }

    export class PieceMovementProfile {
        private _locations: IPieceLocationDictionary;

        constructor(
            private _potentialDestinationFactories: Array<Array<PotentialMovementSegment>>,
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
            for (var i = 0; i < this._potentialDestinationFactories.length; i++) {
                var potentialDestinationFactory = this._potentialDestinationFactories[i];
                var destinationCoordinates = origin.coordinates;
                for (var j = 0; j < potentialDestinationFactory.length; j++) {
                    destinationCoordinates = potentialDestinationFactory[j].applyMovementSegment(destinationCoordinates);
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