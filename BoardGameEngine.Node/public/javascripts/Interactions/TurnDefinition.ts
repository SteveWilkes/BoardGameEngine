module AgileObjects.BoardGameEngine.Interactions {

    export class TurnDefinition {
        constructor(private _interactionDefinitions: Array<TurnInteractionDefinition>) {

            this.interactionTypes = new Array<InteractionType>(this._interactionDefinitions.length);

            for (var i = 0; i < this._interactionDefinitions.length; i++) {
                var definition = this._interactionDefinitions[i];
                this.interactionTypes[i] = definition.interactionType;
            }
        }

        public interactionTypes: Array<InteractionType>;
    }
}