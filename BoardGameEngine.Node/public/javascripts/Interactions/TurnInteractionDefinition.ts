module AgileObjects.BoardGameEngine.Interactions {

    export class TurnInteractionDefinition {
        constructor(
            public interactionType: InteractionType,
            private _availabilityEvaluator: IPotentialInteractionsEvaluator) {
        }

        public isAvailable(data: PotentialInteractionsData): boolean {
            return this._availabilityEvaluator.evaluate(data);
        }
    }
}