module AgileObjects.BoardGameEngine.Interactions {

    var _noInteractionTypes = new Array<InteractionType>(0);

    export class TurnDefinition {
        constructor(private _interactionDefinitions: Array<TurnInteractionDefinition>) {

            this.interactionSequence = new Array<InteractionType>(this._interactionDefinitions.length);

            for (var i = 0; i < this._interactionDefinitions.length; i++) {
                var definition = this._interactionDefinitions[i];
                this.interactionSequence[i] = definition.interactionType;
            }
        }

        public interactionSequence: Array<InteractionType>;

        public getRemainingInteractionSequence(
            previousTurnInteractionIndex: number,
            game: G.Game): Array<InteractionType> {

            if (previousTurnInteractionIndex === (this._interactionDefinitions.length - 1)) {
                return _noInteractionTypes;
            }

            var interactionTypes = new Array<InteractionType>();
            for (var i = previousTurnInteractionIndex; i < this._interactionDefinitions.length; i++) {
                var definition = this._interactionDefinitions[i];
                if (definition.isAvailable(game)) {
                    interactionTypes.push(definition.interactionType);
                }
            }
            return interactionTypes;
        }
    }
}