module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovement {
        constructor(public path: Array<IPieceLocation>) {
            this.origin = this.path[0];
            this.destination = this.path[this.path.length - 1];
        }

        public origin: IPieceLocation;
        public destination: IPieceLocation;

        public setWasPartOfLastMove(wasPartOfLastMove: boolean): void {
            for (var i = 0; i < this.path.length; i++) {
                this.path[i].wasPartOfLastMove = wasPartOfLastMove;
            }
        }
    }
}
