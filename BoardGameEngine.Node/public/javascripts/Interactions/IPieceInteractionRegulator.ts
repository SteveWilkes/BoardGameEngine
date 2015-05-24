module AgileObjects.BoardGameEngine.Interactions {

    export interface IPieceInteractionRegulator {
        getCurrentlySupportedInteractionTypes(forTeam: P.IPieceOwner): Array<InteractionType>;
    }
}