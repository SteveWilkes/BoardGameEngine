module AgileObjects.StrategyGame.Pieces {

    export class PieceInteractionCalculator {
        constructor(
            public type: InteractionType,
            private _locationCalculators: Array<RelatedLocationCalculator>,
            private _interaction: IPieceInteractionConstructor) { }

        public getPotentialInteractions(startingLocation: IPieceLocation, game: Games.Game): Array<IPieceInteraction> {
            var interactions = new Array<IPieceInteraction>();
            for (var i = 0; i < this._locationCalculators.length; i++) {
                var interactionPaths = this._locationCalculators[i].calculateLocationPaths(startingLocation, game);
                for (var j = 0; j < interactionPaths.length; j++) {
                    interactions.push(new this._interaction(
                        this.type + "," + i + "," + j,
                        startingLocation.piece,
                        interactionPaths[j],
                        game.events));
                }
            }
            return interactions;
        }
    }
}