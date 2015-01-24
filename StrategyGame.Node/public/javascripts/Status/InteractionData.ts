module AgileObjects.StrategyGame.Status {

    export class InteractionData {
        constructor(interaction: Pieces.IPieceInteraction) {
            this.pieceId = interaction.piece.id;
            this.interactionId = interaction.id;
        }

        public pieceId: string;
        public interactionId: string;
    }
}