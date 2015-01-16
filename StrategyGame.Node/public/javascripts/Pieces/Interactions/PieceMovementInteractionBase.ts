module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovementInteractionBase implements IPieceInteraction {
        constructor(public path: Array<IPieceLocation>) {
            this.location = this.path[this.path.length - 1];
        }

        public type = InteractionType.Move;
        public location: IPieceLocation;

        public complete(): void {
            throw new Error("Abstract PieceMovementInteractionBase.complete() not implemented");
        }
    }
}