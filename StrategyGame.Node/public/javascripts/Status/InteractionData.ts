module AgileObjects.BoardGameEngine.Status {

    export class InteractionData {
        constructor(public pieceId: string, public interactionId: string) { }

        static forInteraction(interaction: Pieces.IPieceInteraction) {
            return new InteractionData(interaction.piece.id, interaction.id);
        }

        static forAction(action: Pieces.IGameAction) {
            return new InteractionData(action.piece.id, action.interactionId);
        }
    }
}