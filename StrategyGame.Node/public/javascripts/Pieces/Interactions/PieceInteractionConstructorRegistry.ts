﻿module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceInteractionConstructor {
        (path: Array<IPieceLocation>, events: GameEventSet): void;
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