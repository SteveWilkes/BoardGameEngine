module AgileObjects.StrategyGame.Pieces {

    export class MovePieceToDestinationInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>, events: Games.GameEventSet) {
            super(path, events);
        }

        protected performMovement(): void {
            this.path[0].movePieceTo(this.location);
        }
    }
}