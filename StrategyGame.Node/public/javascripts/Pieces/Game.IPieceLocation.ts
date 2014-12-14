module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        add(piece: IPiece): void;
        piece: IPiece;
        replacePieceWith(newPiece: IPiece): void;
        movePieceTo(destination: IPieceLocation): void;
        isPotentialDestination: boolean;
    }
} 