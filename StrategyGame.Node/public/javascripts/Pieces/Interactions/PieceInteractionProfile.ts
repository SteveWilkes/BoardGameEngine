module AgileObjects.BoardGameEngine.Pieces {
    import Ts = TypeScript;

    export class PieceInteractionProfile {
        constructor(private _interactionCalculators: Array<PieceInteractionCalculator>) { }

        public getPotentialInteractions(piece: Piece, game: Games.Game): Ts.IStringDictionary<IPieceInteraction> {
            var supportedTypes = game.type.interactionRegulator.getCurrentlySupportedInteractions(piece);
            var allInteractions: Ts.IStringDictionary<IPieceInteraction> = {};
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                var interactionCalculator = this._interactionCalculators[i];
                if (supportedTypes.indexOf(interactionCalculator.type) === -1) { continue; }
                var interactions = interactionCalculator.getPotentialInteractions(piece.location, game);
                for (var j = 0; j < interactions.length; j++) {
                    allInteractions[interactions[j].id] = interactions[j];
                }
            }
            return allInteractions;
        }
    }
}