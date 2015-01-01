module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovement {
        constructor(public origin: IPieceLocation, public destination: IPieceLocation) { }

        public setWasPartOfLastMove(wasPartOfLastMove: boolean): void {
            this.origin.wasPartOfLastMove = wasPartOfLastMove;
            this.destination.wasPartOfLastMove = wasPartOfLastMove;
        }
    }
}
