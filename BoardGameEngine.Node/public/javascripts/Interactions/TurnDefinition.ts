module AgileObjects.BoardGameEngine.Interactions {

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
            data: PotentialInteractionsData): Array<InteractionType> {

            var interactionTypes = new Array<InteractionType>();
            for (var i = (previousTurnInteractionIndex + 1); i < this._interactionDefinitions.length; i++) {
                var definition = this._interactionDefinitions[i];
                if (definition.isAvailable(data)) {
                    interactionTypes.push(definition.interactionType);
                }
            }
            return interactionTypes;
        }
    }
}