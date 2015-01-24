module AgileObjects.StrategyGame.Pieces {

    export interface IPieceInteractionConstructor {
        (id: string, piece: Piece, path: Array<IPieceLocation>, events: Games.GameEventSet): void;
    }

    export module PieceInteractionConstructorRegistry {
        class PieceInteractionConstructorRegistry {
            private _interactions = {
                "m1": AddDestinationPieceToPieceInteraction,
                "m2": MovePieceToDestinationInteraction,
                "m3": MovePieceToDestinationPieceInteraction,
                "a1": AttackDestinationPieceInteraction,
            };

            public get = (pieceInteractionId: string): IPieceInteractionConstructor => {
                return this._interactions[pieceInteractionId];
            };

        }

        export var INSTANCE = new PieceInteractionConstructorRegistry();
    }
}