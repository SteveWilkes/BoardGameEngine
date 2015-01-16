module AgileObjects.StrategyGame.Game.Pieces {

    export class AddDestinationPieceToPieceInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>, events: GameEventSet) {
            super(path, events);
        }

        public isValid: boolean;

        protected performMovement(): void {
            this.path[0].piece.add(this.location.piece);
            this.path[0].movePieceTo(this.location);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}