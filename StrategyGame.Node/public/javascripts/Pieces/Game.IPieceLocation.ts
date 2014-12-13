module AgileObjects.StrategyGame.Game {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: Coordinates;
        isOccupied(): boolean;
        add(piece: IPiece): void;
        piece: IPiece;
        replacePieceWith(newPiece: IPiece): void;
        movePieceTo(destination: IPieceLocation): void;
        isPotentialDestination: boolean;
    }
} 