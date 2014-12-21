module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceAttack {
        private _locations: IPieceLocationDictionary;

        constructor(private _targetLocationCalculator: RelatedLocationCalculator, public strength: number) { }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            this._targetLocationCalculator.setLocations(allLocations);
        }

        public getTargetLocations(startingLocation: IPieceLocation): Array<IPieceLocation> {
            return this._targetLocationCalculator.calculateLocations(startingLocation);
        }
    }
}