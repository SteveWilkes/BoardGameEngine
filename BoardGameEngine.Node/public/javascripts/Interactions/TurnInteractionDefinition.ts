module AgileObjects.BoardGameEngine.Interactions {

    export class TurnInteractionDefinition {
        constructor(
            public interactionType: InteractionType,
            private _availabilityEvaluator: G.IGameEvaluator) {
        }

        public isAvailable(game: G.Game): boolean {
            return this._availabilityEvaluator.evaluate(game);
        }
    }
}