module AgileObjects.StrategyGame.Game.Pieces {

    export class MovePieceToDestinationPieceInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>, events: GameEventSet) {
            super(path, events);
        }

        protected performMovement(): void {
            this.path[0].movePieceTo(this.location.piece);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}