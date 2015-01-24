module AgileObjects.StrategyGame.Pieces {

    export module NullPotentialInteraction {
        class NullPotentialInteraction implements IPieceInteraction {
            public id: string;
            public type: InteractionType;
            public path = new Array<IPieceLocation>(0);
            public piece: Piece;
            public location = NullPieceLocation.INSTANCE;
            public complete(): void { }
        }

        export var INSTANCE = new NullPotentialInteraction();
    }
}