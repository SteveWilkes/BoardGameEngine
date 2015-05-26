module AgileObjects.BoardGameEngine.Interactions {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractionTypes(forPiece: Piece): Array<InteractionType>;
    }
}