module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceInteractionProfile {
        constructor(private _interactionCalculators: Array<PieceInteractionCalculator>) { }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                this._interactionCalculators[i].setLocations(allLocations);
            }
        }

        public getPotentialInteractions(piece: Piece, types: Array<InteractionType>): Array<IPieceInteraction> {
            var allInteractions = new Array<IPieceInteraction>();
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                var interactionCalculator = this._interactionCalculators[i];
                if (types.indexOf(interactionCalculator.type) === -1) { continue; }
                var interactions = interactionCalculator.getPotentialInteractions(piece.location);
                allInteractions = allInteractions.concat(interactions);
            }
            return allInteractions;
        }
    }
}