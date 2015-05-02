module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractionTypes(forPiece: Pieces.Piece): Array<InteractionType>;
    }
}