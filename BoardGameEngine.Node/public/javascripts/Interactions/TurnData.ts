module AgileObjects.BoardGameEngine.Interactions {

    export class TurnData {
        constructor(public interactionData: Array<InteractionData>) { }

        static forInteractions(interactions: Array<IPieceInteraction>) {
            return TurnData.for(interactions, InteractionData.forInteraction);
        }

        static forActions(actions: Array<IGameAction>) {
            return TurnData.for(actions, InteractionData.forAction);
        }

        static for<T>(items: Array<T>, interactionDataFactory: (item: T) => InteractionData) {
            var interactionData = new Array<InteractionData>(items.length);
            for (var i = 0; i < items.length; i++) {
                interactionData[i] = interactionDataFactory(items[i]);
            }
            return new TurnData(interactionData);
        }

        public gameData: G.GameData;
    }
}