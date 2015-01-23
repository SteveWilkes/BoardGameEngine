module AgileObjects.StrategyGame.Pieces {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractions(forPiece: Pieces.Piece): Array<InteractionType>;
    }
}