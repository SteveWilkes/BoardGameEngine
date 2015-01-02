module AgileObjects.StrategyGame.Game.Pieces {

    export module NullPotentialInteraction {
        class NullPotentialInteraction implements IPieceInteraction {
            public type: InteractionType;
            public location = NullPieceLocation.INSTANCE;
            public complete(): void { }
        }

        export var INSTANCE = new NullPotentialInteraction();
    }
}