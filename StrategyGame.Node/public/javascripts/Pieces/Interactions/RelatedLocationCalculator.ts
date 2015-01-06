module AgileObjects.StrategyGame.Game.Pieces {

    export class RelatedLocationCalculator {
        private _allLocations: IPieceLocationDictionary;

        constructor(
            private _coordinateTranslatorSets: Array<Array<TypeScript.CoordinateTranslator>>,
            private _destinationValidators: Array<IPieceLocationValidator>) {
        }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            this._allLocations = allLocations;
        }

        public calculatePathsToLocations(startingLocation: IPieceLocation): Array<Array<IPieceLocation>> {
            var paths = new Array<Array<IPieceLocation>>();
            var j;
            for (var i = 0; i < this._coordinateTranslatorSets.length; i++) {
                var coordinateTranslators = this._coordinateTranslatorSets[i];
                var path = new Array<IPieceLocation>(startingLocation);
                var locationCoordinates = startingLocation.coordinates;
                var pathInvalid = false;
                for (j = 0; j < coordinateTranslators.length; j++) {
                    locationCoordinates = coordinateTranslators[j].translate(locationCoordinates);
                    var location = this._allLocations[locationCoordinates.signature];
                    if (location === undefined) {
                        pathInvalid = true;
                        break;
                    }
                    path.push(location);
                }
                if (pathInvalid) { continue; }
                var destination = path[path.length - 1];
                var anyValidatorsInvalid = false;
                for (j = 0; j < this._destinationValidators.length; j++) {
                    // TODO: Validate entire path?
                    if (!this._destinationValidators[j].isValid(destination, startingLocation.piece)) {
                        anyValidatorsInvalid = true;
                        break;
                    }
                }
                if (anyValidatorsInvalid) { continue; }
                paths.push(path);
            }
            return paths;
        }
    }
}