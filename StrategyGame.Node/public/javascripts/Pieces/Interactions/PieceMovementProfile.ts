module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementProfile {
        constructor(
            private _destinationCalculators: Array<RelatedLocationCalculator>,
            private _locationTranslator?: (location: IPieceLocation) => Array<IPieceLocation>) { }

        public setLocations(allLocations): void {
            for (var i = 0; i < this._destinationCalculators.length; i++) {
                this._destinationCalculators[i].setLocations(allLocations);
            }
        }

        public getDestinations(origin: IPieceLocation): Array<IPieceLocation> {
            var destinations = new Array<IPieceLocation>();
            for (var i = 0; i < this._destinationCalculators.length; i++) {
                var possibleDestinations = this._destinationCalculators[i].calculateLocations(origin);
                if (this._locationTranslator !== undefined) {
                    var allTranslatedDestinations = new Array<IPieceLocation>();
                    for (var j = 0; j < possibleDestinations.length; j++) {
                        var translatedDestinations = this._locationTranslator(possibleDestinations[j]);
                        allTranslatedDestinations = allTranslatedDestinations.concat(translatedDestinations);
                    }
                    possibleDestinations = allTranslatedDestinations;
                }
                destinations = destinations.concat(possibleDestinations);
            }
            return destinations;
        }
    }
}