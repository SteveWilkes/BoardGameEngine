module AgileObjects.StrategyGame.Game.Pieces {

    export class AddDestinationPieceToPieceInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>) {
            super(path);
        }

        public isValid: boolean;

        public complete(): void {
            this.path[0].piece.add(this.location.piece);
            this.path[0].movePieceThrough(this.path);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}