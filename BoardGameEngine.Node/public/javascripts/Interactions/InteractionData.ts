module AgileObjects.BoardGameEngine.Interactions {

    export class InteractionData {
        constructor(public pieceId: string, public interactionId: string) { }

        static forInteraction(interaction: IPieceInteraction) {
            return new InteractionData(interaction.piece.id, interaction.id);
        }

        static forAction(action: IGameAction) {
            return new InteractionData(action.piece.id, action.interactionId);
        }
    }
}