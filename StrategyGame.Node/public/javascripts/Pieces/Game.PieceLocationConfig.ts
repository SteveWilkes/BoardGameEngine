module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceLocationConfigData {
        public row: number;
        public column: number;
        public pieceDefinitionId: string;


    }

    export class PieceLocationConfig {
        constructor(public tileCoordinates: TypeScript.Coordinates, public piece: IPiece) { }
    }
} 