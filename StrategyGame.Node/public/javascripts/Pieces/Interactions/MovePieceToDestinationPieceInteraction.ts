module AgileObjects.StrategyGame.Game.Pieces {

    export class MovePieceToDestinationPieceInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>) {
            super(path);
        }

        public complete(): void {
            this.path[0].movePieceThrough([this.location.piece]);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}