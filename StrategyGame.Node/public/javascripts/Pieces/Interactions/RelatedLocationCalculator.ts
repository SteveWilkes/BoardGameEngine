module AgileObjects.StrategyGame.Game.Pieces {

    export class RelatedLocationCalculator {
        private _allLocations: IPieceLocationDictionary;

        constructor(
            private _coordinateTranslatorSets: Array<Array<TypeScript.CoordinateTranslator>>,
            private _locationValidators: Array<IPieceLocationValidator>) {
        }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            this._allLocations = allLocations;
        }

        public calculateLocations(startingLocation: IPieceLocation): Array<IPieceLocation> {
            var locations = new Array<IPieceLocation>();
            var j;
            for (var i = 0; i < this._coordinateTranslatorSets.length; i++) {
                var coordinateTranslators = this._coordinateTranslatorSets[i];
                var locationCoordinates = startingLocation.coordinates;
                for (j = 0; j < coordinateTranslators.length; j++) {
                    locationCoordinates = coordinateTranslators[j].translate(locationCoordinates);
                }
                var location = this._allLocations[locationCoordinates.signature];
                if (location === undefined) { continue; }
                var allValidatorsValid = true;
                for (j = 0; j < this._locationValidators.length; j++) {
                    if (!this._locationValidators[j].isValid(location, startingLocation.piece)) {
                        allValidatorsValid = false;
                        break;
                    }
                }
                if (!allValidatorsValid) { continue; }
                locations.push(location);
            }
            return locations;
        }
    }
}