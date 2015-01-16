module AgileObjects.StrategyGame.Game.Pieces {

    export class MovePieceToDestinationInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>, events: GameEventSet) {
            super(path, events);
        }

        protected performMovement(): void {
            this.path[0].movePieceTo(this.location);
        }
    }
}