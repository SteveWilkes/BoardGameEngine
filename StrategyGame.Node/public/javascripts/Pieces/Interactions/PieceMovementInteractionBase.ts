module AgileObjects.StrategyGame.Pieces {

    export class PieceMovementInteractionBase extends PieceInteractionBase {
        constructor(
            id: string,
            piece: Piece,
            path: Array<IPieceLocation>,
            private _events: Games.GameEventSet) {

            super(id, piece, path, InteractionType.Move);
        }

        public complete(): void {
            this.performMovement();

            var movement = new PieceMovement(this.id, this.piece, this.path);

            this._events.pieceMoved.publish(movement);
        }

        protected performMovement(): void {
            throw new Error("Abstract PieceMovementInteractionBase.performMovement() not implemented");
        }
    }
}