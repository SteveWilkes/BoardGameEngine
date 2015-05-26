module AgileObjects.BoardGameEngine.Interactions {

    export class TurnInteractionDefinition {
        constructor(
            public interactionType: InteractionType,
            private _availabilityEvaluator: G.IGameEvaluator) {
            console.log("Created interaction definition, evaluator: " + this._availabilityEvaluator);
        }

        public isAvailable(game: G.Game): boolean {
            return this._availabilityEvaluator.evaluate(game);
        }
    }
}