module AgileObjects.StrategyGame.Game.Pieces {

    export class RelatedLocationCalculator {
        private _allLocations: IPieceLocationDictionary;

        constructor(
            private _coordinateTranslatorSets: Array<Array<TypeScript.CoordinateTranslator>>,
            private _pathStepValidators: Array<IPieceLocationValidator>,
            private _pathDestinationValidators: Array<IPieceLocationValidator>) {
        }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            this._allLocations = allLocations;
        }

        public calculateLocationPaths(startingLocation: IPieceLocation): Array<Array<IPieceLocation>> {
            var paths = new Array<Array<IPieceLocation>>();
            var j;
            for (var i = 0; i < this._coordinateTranslatorSets.length; i++) {
                var coordinateTranslators = this._coordinateTranslatorSets[i];
                var path = new Array<IPieceLocation>(startingLocation);
                var startingCoordinates = startingLocation.coordinates;
                var pathInvalid = false;
                for (j = 0; j < coordinateTranslators.length; j++) {
                    var locationCoordinatesPath = coordinateTranslators[j].translate(startingCoordinates);
                    var pathLength = locationCoordinatesPath.length;
                    for (var k = 0; k < pathLength; k++) {
                        var locationCoordinates = locationCoordinatesPath[k];
                        var location = this._allLocations[locationCoordinates.signature];
                        if (this._pathStepIsInvalid(startingLocation, location, k, pathLength)) {
                            pathInvalid = true;
                            break;
                        }
                        path.push(location);
                    }
                    if (pathInvalid) { break; }
                    startingCoordinates = path[path.length - 1].coordinates;
                }
                if (pathInvalid) { continue; }
                paths.push(path);
            }
            return paths;
        }

        private _pathStepIsInvalid(
            startingLocation: IPieceLocation,
            pathStepLocation: IPieceLocation,
            pathStepIndex: number,
            pathLength: number): boolean {

            if (pathStepLocation === undefined) { return true; }

            var validators = (pathStepIndex === (pathLength - 1))
                ? this._pathDestinationValidators
                : this._pathStepValidators;

            for (var i = 0; i < validators.length; i++) {
                if (!validators[i].isValid(pathStepLocation, startingLocation.piece)) {
                    return true;
                }
            }

            return false;
        }
    }
}