module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractions(forTeam: Pieces.IPieceOwner): Array<InteractionType>;
    }
}