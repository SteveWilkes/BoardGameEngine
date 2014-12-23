module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        add(piece: Piece): void;
        piece: Piece;
        movePieceTo(destination: IPieceLocation): void;
        isPotentialDestination: boolean;
        potentialAttack: PieceAttack;
    }
} 