module AgileObjects.StrategyGame.Game.Pieces {

    export class MovePieceToDestinationInteraction extends PieceMovementInteractionBase {
        constructor(path: Array<IPieceLocation>) {
            super(path);
        }

        public complete(): void {
            this.path[0].movePieceThrough(this.path);
        }

        static isValid = (path: Array<IPieceLocation>) => { return true; }
    }
}