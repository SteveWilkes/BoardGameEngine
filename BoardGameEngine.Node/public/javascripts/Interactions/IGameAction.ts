module AgileObjects.BoardGameEngine.Interactions {

    export interface IGameAction {
        interactionId;
        piece: IPiece;
        description: string;
    }
}