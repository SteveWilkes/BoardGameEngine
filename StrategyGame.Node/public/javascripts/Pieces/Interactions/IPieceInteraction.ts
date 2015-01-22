module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceInteraction {
        type: InteractionType;
        path: Array<IPieceLocation>;
        location: IPieceLocation;
        complete(): void;
    }
}