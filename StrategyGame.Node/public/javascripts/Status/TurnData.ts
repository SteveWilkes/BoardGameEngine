module AgileObjects.StrategyGame.Status {

    export class TurnData {
        constructor(interactions: Array<Pieces.IPieceInteraction>) {
            this.interactionData = new Array<InteractionData>();
            for (var i = 0; i < interactions.length; i++) {
                this.interactionData.push(new InteractionData(interactions[i]));
            }
        }

        public interactionData: Array<InteractionData>;
    }
}