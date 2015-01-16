module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementInteractionBase extends PieceInteractionBase {
        constructor(public path: Array<IPieceLocation>, private _events: GameEventSet) {
            super(path, InteractionType.Move);
        }

        public complete(): void {
            this.performMovement();

            var movement = new Pieces.PieceMovement(this.path);

            this._events.pieceMoved.publish(movement);
        }

        protected performMovement(): void {
            throw new Error("Abstract PieceMovementInteractionBase.performMovement() not implemented");
        }
    }
}