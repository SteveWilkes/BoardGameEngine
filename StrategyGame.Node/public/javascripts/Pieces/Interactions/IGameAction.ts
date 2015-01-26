module AgileObjects.StrategyGame.Pieces {

    export interface IGameAction {
        interactionId;
        piece: Pieces.Piece;
        description: string;
    }
}