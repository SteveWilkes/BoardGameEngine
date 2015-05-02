module AgileObjects.BoardGameEngine.Interactions {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractionTypes(forPiece: P.Piece): Array<InteractionType>;
    }
}