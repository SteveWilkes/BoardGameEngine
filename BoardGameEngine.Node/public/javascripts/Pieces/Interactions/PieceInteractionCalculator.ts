module AgileObjects.BoardGameEngine.Pieces {

    var _noInteractions = new Array<IPieceInteraction>();

    export class PieceInteractionCalculator {
        constructor(
            public type: InteractionType,
            private _locationCalculators: Array<RelatedLocationCalculator>,
            private _interaction: new (id: string, piece: Piece, path: Array<IPieceLocation>, events: Games.GameEventSet) => IPieceInteraction,
            private _availabilityEvaluator: Evaluation.IPieceEvaluator) { }

        public getPotentialInteractions(startingLocation: IPieceLocation, game: Games.Game): Array<IPieceInteraction> {
            if (!this._availabilityEvaluator.evaluate(startingLocation.piece)) {
                return _noInteractions;
            }

            var allLocations = game.board.getTiles();
            var interactions = new Array<IPieceInteraction>();
            for (var i = 0; i < this._locationCalculators.length; i++) {
                var interactionPaths = this._locationCalculators[i]
                    .calculateLocationPaths(startingLocation, allLocations, game.board.type.gridSize);

                for (var j = 0; j < interactionPaths.length; j++) {
                    var interactionPath = interactionPaths[j];
                    var interactionLocation = interactionPath[interactionPath.length - 1];

                    var interactionId =
                        startingLocation.piece.id + "," +
                        this.type + "," +
                        interactionLocation.coordinates.signature;

                    interactions.push(new this._interaction(
                        interactionId,
                        startingLocation.piece,
                        interactionPath,
                        game.events));
                }
            }
            return interactions;
        }
    }
}