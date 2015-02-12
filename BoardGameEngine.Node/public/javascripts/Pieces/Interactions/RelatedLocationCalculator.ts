module AgileObjects.BoardGameEngine.Pieces {

    import Ts = TypeScript;

    export class RelatedLocationCalculator {
        constructor(
            private _coordinateTranslatorSets: Array<Array<Ts.CoordinateTranslator>>,
            private _pathStepLocationEvaluator: Evaluation.IPieceInteractionContextEvaluator,
            private _pathDestinationEvaluator: Evaluation.IPieceInteractionContextEvaluator) {
            if (this._pathStepLocationEvaluator == null) {
                this._pathStepLocationEvaluator = Ts.Evaluation.AlwaysTrueEvaluator.INSTANCE;
            }
            if (this._pathDestinationEvaluator == null) {
                this._pathDestinationEvaluator = Ts.Evaluation.AlwaysTrueEvaluator.INSTANCE;
            }
        }

        public calculateLocationPaths(
            startingLocation: IPieceLocation,
            allLocations: IPieceLocationDictionary,
            gridSize?: number): Array<Array<IPieceLocation>> {

            var context = new PieceInteractionContext(startingLocation);
            var allPaths = new Array<Array<IPieceLocation>>();
            for (var i = 0; i < this._coordinateTranslatorSets.length; i++) {
                var paths = this._calculatePaths(context, allLocations, gridSize, this._coordinateTranslatorSets[i]);
                if (paths.length > 0) { allPaths = allPaths.concat(paths); }
            }
            return allPaths;
        }

        private _calculatePaths(
            context: PieceInteractionContext,
            allLocations: IPieceLocationDictionary,
            gridSize: number,
            coordinateTranslators: Array<Ts.CoordinateTranslator>): Array<Array<IPieceLocation>> {

            var allPaths = new Array<Array<IPieceLocation>>();
            var path = new Array<IPieceLocation>(context.startingLocation);
            var startingCoordinates = context.startingLocation.coordinates;
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
                    if (this._pathIsValid(path, context)) {
                        allPaths.push(path.slice(0, path.length));
                    }
                }
                if (pathInvalid) { break; }
                startingCoordinates = path[path.length - 1].coordinates;
            }

            return allPaths;
        }

        private _pathIsValid(path: Array<IPieceLocation>, context: PieceInteractionContext): boolean {
            for (var i = 1; i < path.length; i++) {

                var evaluator = (i === (path.length - 1))
                    ? this._pathDestinationEvaluator
                    : this._pathStepLocationEvaluator;

                context.location = path[i];

                if (!evaluator.evaluate(context)) { return false; }
            }

            return true;
        }
    }
}