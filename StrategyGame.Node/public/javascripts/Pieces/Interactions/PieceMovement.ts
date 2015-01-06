module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovement {
        constructor(private _path: Array<IPieceLocation>) {
            this.origin = this._path[0];
            this.destination = this._path[this._path.length - 1];
        }

        public origin: IPieceLocation;
        public destination: IPieceLocation;

        public setWasPartOfLastMove(wasPartOfLastMove: boolean): void {
            for (var i = 0; i < this._path.length; i++) {
                this._path[i].wasPartOfLastMove = wasPartOfLastMove;
            }
        }
    }
}
