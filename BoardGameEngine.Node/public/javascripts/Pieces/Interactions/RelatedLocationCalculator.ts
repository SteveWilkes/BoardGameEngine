module AgileObjects.BoardGameEngine.Pieces {

    export class RelatedLocationCalculator {
        constructor(
            private _coordinateTranslatorSets: Array<Array<TypeScript.CoordinateTranslator>>,
            private _pathStepLocationValidators: Array<IPieceLocationEvaluator>,
            private _pathDestinationValidators: Array<IPieceLocationEvaluator>) {
        }

        public calculateLocationPaths(
            startingLocation: IPieceLocation,
            allLocations: IPieceLocationDictionary,
            gridSize?: number): Array<Array<IPieceLocation>> {

            var allPaths = new Array<Array<IPieceLocation>>();
            for (var i = 0; i < this._coordinateTranslatorSets.length; i++) {
                var paths = this._calculatePaths(startingLocation, allLocations, gridSize, this._coordinateTranslatorSets[i]);
                if (paths.length > 0) { allPaths = allPaths.concat(paths); }
            }
            return allPaths;
        }

        private _calculatePaths(
            startingLocation: IPieceLocation,
            allLocations: IPieceLocationDictionary,
            gridSize: number,
            coordinateTranslators: Array<TypeScript.CoordinateTranslator>): Array<Array<IPieceLocation>> {

            var allPaths = new Array<Array<IPieceLocation>>();
            var path = new Array<IPieceLocation>(startingLocation);
            var startingCoordinates = startingLocation.coordinates;
            for (var i = 0; i < coordinateTranslators.length; i++) {
                var locationCoordinatesPath = coordinateTranslators[i].getPath(startingCoordinates, gridSize);
                var pathInvalid = false;
                for (var j = 0; j < locationCoordinatesPath.length; j++) {
                    var locationCoordinates = locationCoordinatesPath[j];
                    if (!allLocations.hasOwnProperty(locationCoordinates.signature)) {
                        pathInvalid = true;
                        break;
                    }
                    path.push(allLocations[locationCoordinates.signature]);
                    if (this._pathIsValid(path, startingLocation)) {
                        allPaths.push(path.slice(0, path.length));
                    }
                }
                if (pathInvalid) { break; }
                startingCoordinates = path[path.length - 1].coordinates;
            }

            return allPaths;
        }

        private _pathIsValid(path: Array<IPieceLocation>, startingLocation: IPieceLocation): boolean {
            for (var i = 1; i < path.length; i++) {

                var validators = (i === (path.length - 1))
                    ? this._pathDestinationValidators
                    : this._pathStepLocationValidators;

                for (var j = 0; j < validators.length; j++) {
                    if (!validators[j].isValid(path[i], startingLocation.piece)) {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}