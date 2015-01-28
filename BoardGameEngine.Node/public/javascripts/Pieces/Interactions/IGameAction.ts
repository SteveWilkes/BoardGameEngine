module AgileObjects.BoardGameEngine.Pieces {

    export interface IGameAction {
        interactionId;
        piece: Pieces.Piece;
        description: string;
    }
}