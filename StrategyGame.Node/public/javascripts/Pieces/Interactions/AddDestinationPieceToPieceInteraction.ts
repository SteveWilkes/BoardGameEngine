module AgileObjects.StrategyGame.Pieces {

    export class AddDestinationPieceToPieceInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>, events: Games.GameEventSet) {
            super(path, events);
        }

        protected performMovement(): void {
            this.path[0].piece.add(this.location.piece);
            this.path[0].movePieceTo(this.location);
        }
    }
}