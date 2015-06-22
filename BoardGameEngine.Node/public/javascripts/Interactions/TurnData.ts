module AgileObjects.BoardGameEngine.Interactions {

    export class TurnData {
        constructor(public interactionData: Array<InteractionId>, public gameId: string) { }

        static from(items: Array<InteractionId>|Array<IGameAction>, gameId: string) {
            if (items.length === 0) { return new TurnData([], gameId); }

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

            return new TurnData(interactionData, gameId);
        }

        public gameData: G.GameData;
    }
}