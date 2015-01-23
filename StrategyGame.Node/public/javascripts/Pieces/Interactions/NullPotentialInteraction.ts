module AgileObjects.StrategyGame.Pieces {

    export module NullPotentialInteraction {
        class NullPotentialInteraction implements IPieceInteraction {
            public type: InteractionType;
            public path = new Array<IPieceLocation>(0);
            public location = NullPieceLocation.INSTANCE;
            public complete(): void { }
        }

        export var INSTANCE = new NullPotentialInteraction();
    }
}