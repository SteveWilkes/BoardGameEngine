module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractions(forPiece: Pieces.Piece): Array<InteractionType>;
    }
}