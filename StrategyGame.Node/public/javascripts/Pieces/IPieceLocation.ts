﻿module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        isSelected(newValue?: boolean): boolean;
        add(piece: Piece): void;
        contains(location: IPieceLocation): boolean;
        piece: Piece;
        movePieceThrough(path: Array<IPieceLocation>): void;
        potentialInteractions(interactions?: Array<IPieceInteraction>): Array<IPieceInteraction>;
        wasPartOfLastMove: boolean;
    }
} 