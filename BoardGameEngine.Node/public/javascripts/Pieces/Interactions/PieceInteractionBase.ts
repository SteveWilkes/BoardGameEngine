module AgileObjects.BoardGameEngine.Pieces {

    export class PieceInteractionBase implements IPieceInteraction {
        constructor(
            public id: string,
            public piece: Piece,
            public path: Array<IPieceLocation>,
            public type: InteractionType) {

            this.location = this.path[this.path.length - 1];
        }


        public location: IPieceLocation;

        public complete(): void {
            throw new Error("Abstract PieceInteractionBase.complete() not implemented");
        }
    }
}