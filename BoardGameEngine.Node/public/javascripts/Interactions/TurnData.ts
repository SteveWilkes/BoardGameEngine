module AgileObjects.BoardGameEngine.Interactions {

    export class TurnData {
        constructor(public interactionData: Array<InteractionId>) { }

        static noInteractions = new TurnData([]);

        static from(items: Array<InteractionId>|Array<IGameAction>) {
            if (items.length === 0) { return TurnData.noInteractions; }

            var interactionData;

            if (items[0] instanceof InteractionId) {
                interactionData = <Array<InteractionId>>items;
            } else {
                interactionData = new Array<InteractionId>(items.length);
                for (var i = 0; i < items.length; i++) {
                    var action = <IGameAction>items[i];
                    interactionData[i] = InteractionId.from(action.interactionId);
                }
            }

            return new TurnData(interactionData);
        }

        public gameData: G.GameData;
    }
}