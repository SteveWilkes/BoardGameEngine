module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceInteraction extends I.IPieceInteraction {
        type: InteractionType;
        piece: Piece;
        path: Array<IPieceLocation>;
        location: IPieceLocation;
        complete(): void;
    }
}