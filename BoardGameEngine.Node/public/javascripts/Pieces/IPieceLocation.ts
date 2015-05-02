module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceLocationDictionary extends Ts.IStringDictionary<IPieceLocation> { }

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