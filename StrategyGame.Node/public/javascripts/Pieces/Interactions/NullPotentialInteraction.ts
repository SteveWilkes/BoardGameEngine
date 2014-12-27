module AgileObjects.StrategyGame.Game.Pieces {

    export module NullPotentialInteraction {
        class NullPotentialInteraction implements IPieceInteraction {
            public type: InteractionType;
            public location = <IPieceLocation>{
                coordinates: undefined,
                piece: undefined,
                wasPartOfLastMove: false,
                potentialInteraction: () => { return undefined; },
                add: () => { },
                isSelected: () => false,
                contains: () => false,
                isOccupied: () => false,
                movePieceTo: () => false
            };

            public complete(): void { }
        }

        export var instance = new NullPotentialInteraction();
    }
}