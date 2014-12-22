module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementProfile {
        constructor(private _destinationCalculators: Array<RelatedLocationCalculator>) { }

        public setLocations(allLocations): void {
            for (var i = 0; i < this._destinationCalculators.length; i++) {
                this._destinationCalculators[i].setLocations(allLocations);
            }
        }

        public getDestinations(origin: IPieceLocation): Array<IPieceLocation> {
            var destinations = new Array<IPieceLocation>();
            for (var i = 0; i < this._destinationCalculators.length; i++) {
                var possibleDestinations = this._destinationCalculators[i].calculateLocations(origin);
                destinations = destinations.concat(possibleDestinations);
            }
            return destinations;
        }
    }
}