module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceInteractionCalculator {
        constructor(
            public type: InteractionType,
            private _locationCalculators: Array<RelatedLocationCalculator>,
            private _interaction: IPieceInteractionConstructor,
            private _events: GameEventSet) { }

        public setLocations(allLocations: IPieceLocationDictionary): void {
            for (var i = 0; i < this._locationCalculators.length; i++) {
                this._locationCalculators[i].setLocations(allLocations);
            }
        }

        public getPotentialInteractions(startingLocation: IPieceLocation): Array<IPieceInteraction> {
            var interactions = new Array<IPieceInteraction>();
            for (var i = 0; i < this._locationCalculators.length; i++) {
                var interactionLocations = this._locationCalculators[i].calculateLocations(startingLocation);
                for (var j = 0; j < interactionLocations.length; j++) {
                    var interaction = new this._interaction(startingLocation, interactionLocations[j], this._events);
                    interactions.push(interaction);
                }
            }
            return interactions;
        }
    }
}