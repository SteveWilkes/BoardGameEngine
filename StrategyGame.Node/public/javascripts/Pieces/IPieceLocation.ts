module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationDictionary extends TypeScript.IStringDictionary<IPieceLocation> { }

    export interface IPieceLocation {
        coordinates: TypeScript.Coordinates;
        isOccupied(): boolean;
        add(piece: Piece): void;
        piece: Piece;
        replacePieceWith(newPiece: Piece): void;
        movePieceTo(destination: IPieceLocation): void;
        isPotentialDestination: boolean;
        potentialAttack: PieceAttack;
    }
} 