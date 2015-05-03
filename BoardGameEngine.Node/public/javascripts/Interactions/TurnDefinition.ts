module AgileObjects.BoardGameEngine.Interactions {

    var _noInteractionTypes = new Array<InteractionType>(0);

    export class TurnDefinition {
        constructor(private _interactionDefinitions: Array<TurnInteractionDefinition>) {

            this.interactionTypes = new Array<InteractionType>(this._interactionDefinitions.length);

            for (var i = 0; i < this._interactionDefinitions.length; i++) {
                var definition = this._interactionDefinitions[i];
                this.interactionTypes[i] = definition.interactionType;
            }
        }

        public interactionTypes: Array<InteractionType>;

        public getAvailableInteractionTypes(
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