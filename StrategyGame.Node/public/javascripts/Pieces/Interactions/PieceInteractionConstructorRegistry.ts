module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceInteractionConstructor {
        (startingLocation: IPieceLocation, destination: IPieceLocation, events: GameEventSet): void;
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