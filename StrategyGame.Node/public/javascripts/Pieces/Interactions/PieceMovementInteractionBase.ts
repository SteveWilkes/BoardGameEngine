module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementInteractionBase implements IPieceInteraction {
        constructor(public path: Array<IPieceLocation>, private _events: GameEventSet) {
            this.location = this.path[this.path.length - 1];
        }

        public type = InteractionType.Move;
        public location: IPieceLocation;

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