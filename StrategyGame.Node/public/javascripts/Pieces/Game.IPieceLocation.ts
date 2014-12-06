module AgileObjects.StrategyGame.Game {

    export interface IPieceLocationDictionary extends AgileObjects.TypeScript.IStringDictionary<IPieceLocation> {
    }

    export interface IPieceLocation {
        coordinates: Coordinates;
        isOccupied(): boolean;
        add(piece: IPiece): void;
        piece: IPiece;
        movePieceTo(destination: IPieceLocation): void;
        isPotentialDestination: boolean;
    }
} 