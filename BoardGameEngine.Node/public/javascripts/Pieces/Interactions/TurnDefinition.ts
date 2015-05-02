module AgileObjects.BoardGameEngine.Pieces {

    export class TurnDefinition {
        constructor(private _interactionDefinitions: Array<TurnInteractionDefinition>) {

            this.interactionTypes = new Array<InteractionType>(this._interactionDefinitions.length);

            for (var i = 0; i < this._interactionDefinitions.length; i++) {
                this.interactionTypes[i] = this._interactionDefinitions[i].interactionType;
            }
        }

        public interactionTypes: Array<InteractionType>;
    }
}