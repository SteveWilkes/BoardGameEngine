module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovement extends TypeScript.EventCallbackSetBase {
        constructor(public origin: IPieceLocation, public destination: IPieceLocation) {
            super();
        }

        public setWasPartOfLastMove(wasPartOfLastMove: boolean): void {
            this.origin.wasPartOfLastMove = wasPartOfLastMove;
            this.destination.wasPartOfLastMove = wasPartOfLastMove;
        }
    }
}
