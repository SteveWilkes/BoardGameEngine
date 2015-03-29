module AgileObjects.BoardGameEngine.Pieces {

    export class NullPotentialInteraction implements IPieceInteraction {
        static INSTANCE = new NullPotentialInteraction();

        public id: string;
        public type: InteractionType;
        public path = new Array<IPieceLocation>(0);
        public piece: Piece;
        public location = NullPieceLocation.INSTANCE;
        public complete(): void { }
    }
}