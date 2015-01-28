module AgileObjects.BoardGameEngine.Pieces {

    export class PieceMovement implements IGameAction {
        constructor(
            public interactionId,
            public piece: Piece,
            public path: Array<IPieceLocation>) {

            this.origin = this.path[0];
            this.destination = this.path[this.path.length - 1];

            this.description =
            this.origin.coordinates.signature + " moved to " +
            this.destination.coordinates.signature;
        }

        public origin: IPieceLocation;
        public destination: IPieceLocation;
        public description: string;

        public setWasPartOfLastMove(wasPartOfLastMove: boolean): void {
            for (var i = 0; i < this.path.length; i++) {
                this.path[i].wasPartOfLastMove = wasPartOfLastMove;
            }
        }
    }
}
