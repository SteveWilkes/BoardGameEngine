module AgileObjects.StrategyGame.Game.Pieces {

    export enum InteractionType { Move, Attack }

    export interface IPieceInteraction {
        type: InteractionType;
        path: Array<IPieceLocation>;
        location: IPieceLocation;
        complete(): void;
    }
}