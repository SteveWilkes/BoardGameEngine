module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceInteractionConstructor {
        (path: Array<IPieceLocation>, events: GameEventSet): void;
        // TODO: Remove this - it doesn't appear to be used:
        isValid(path: Array<IPieceLocation>): boolean;
    }

    export module PieceInteractionConstructorRegistry {
        var interactions = {
            "m1": AddDestinationPieceToPieceInteraction,
            "m2": MovePieceToDestinationInteraction,
            "m3": MovePieceToDestinationPieceInteraction,
            "a1": AttackDestinationPieceInteraction,
        };

        export var get = (pieceInteractionId: string): IPieceInteractionConstructor => {
            return interactions[pieceInteractionId];
        };
    }
}