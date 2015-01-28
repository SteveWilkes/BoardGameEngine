module AgileObjects.BoardGameEngine.Pieces {

    export class AddDestinationPieceToPieceInteraction extends PieceMovementInteractionBase {
        constructor(
            id: string,
            piece: Piece,
            path: Array<IPieceLocation>,
            events: Games.GameEventSet) {

            super(id, piece, path, events);
        }

        protected performMovement(): void {
            this.piece.add(this.location.piece);
            this.piece.location.movePieceTo(this.location);
        }
    }
}