module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceInteractionProfile {
        constructor(private _interactionCalculators: Array<PieceInteractionCalculator>) { }

        public getPotentialInteractions(piece: Piece, game: Game): Array<IPieceInteraction> {
            var supportedTypes = game.type.interactionRegulator.getCurrentlySupportedInteractions(piece);
            var allInteractions = new Array<IPieceInteraction>();
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                var interactionCalculator = this._interactionCalculators[i];
                if (supportedTypes.indexOf(interactionCalculator.type) === -1) { continue; }
                var interactions = interactionCalculator.getPotentialInteractions(piece.location, game);
                allInteractions = allInteractions.concat(interactions);
            }
            return allInteractions;
        }
    }
}