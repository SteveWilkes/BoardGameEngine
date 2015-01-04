module AgileObjects.StrategyGame.Game.Pieces {

    export enum InteractionType { Move, Attack }

    export interface IPieceInteraction {
        type: InteractionType;
        location: IPieceLocation;
        complete(): void;
    }
}