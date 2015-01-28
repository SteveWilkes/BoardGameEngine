module AgileObjects.BoardGameEngine.Pieces {

    export class MovePieceToDestinationInteraction extends PieceMovementInteractionBase {
        constructor(
            id: string,
            piece: Piece,
            path: Array<IPieceLocation>,
            events: Games.GameEventSet) {

            super(id, piece, path, events);
        }

        protected performMovement(): void {
            this.piece.location.movePieceTo(this.location);
        }
    }
}