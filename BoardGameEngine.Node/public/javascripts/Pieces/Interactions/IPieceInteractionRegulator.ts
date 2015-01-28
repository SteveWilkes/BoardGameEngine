module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractions(forPiece: Pieces.Piece): Array<InteractionType>;
    }
}