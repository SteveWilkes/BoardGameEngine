module AgileObjects.StrategyGame.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        isSelected(newValue?: boolean): boolean;
        add(piece: Piece): void;
        contains(location: IPieceLocation): boolean;
        piece: Piece;
        movePieceTo(destination: IPieceLocation): void;
        potentialInteractions(interactions?: Array<IPieceInteraction>): Array<IPieceInteraction>;
        wasPartOfLastMove: boolean;
    }
} 