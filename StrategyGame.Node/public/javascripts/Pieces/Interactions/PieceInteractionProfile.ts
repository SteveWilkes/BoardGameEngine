module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceInteractionProfile {
        constructor(private _interactionCalculators: Array<PieceInteractionCalculator>) { }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                this._interactionCalculators[i].setLocations(allLocations);
            }
        }

        public getPotentialInteractions(piece: Piece): Array<IPieceInteraction> {
            var allInteractions = new Array<IPieceInteraction>();
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                var interactions = this._interactionCalculators[i].getPotentialInteractions(piece.location);
                allInteractions = allInteractions.concat(interactions);
            }
            return allInteractions;
        }
    }
}