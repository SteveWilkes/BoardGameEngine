module AgileObjects.StrategyGame.Pieces {

    export interface IPieceInteraction {
        type: InteractionType;
        path: Array<IPieceLocation>;
        location: IPieceLocation;
        complete(): void;
    }
}