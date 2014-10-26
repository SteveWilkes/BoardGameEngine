module AgileObjects.StrategyGame.Game {

    export interface IPieceLocationDictionary extends AgileObjects.TypeScript.IStringDictionary<IPieceLocation> {
    }

    export interface IPieceLocation {
        position: Coordinates;
        isOccupied(): boolean;
        add(piece: IPiece): void;
        piece: IPiece;
        movePieceTo(destination: IPieceLocation): void;
        isPotentialDestination: boolean;
    }
} 