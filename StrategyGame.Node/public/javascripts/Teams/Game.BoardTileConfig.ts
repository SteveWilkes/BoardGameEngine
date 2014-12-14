module AgileObjects.StrategyGame.Game.Teams {
    import Pieces = StrategyGame.Game.Pieces;

    export class BoardTileConfig {
        constructor(public tileCoordinates: TypeScript.Coordinates, public piece: Pieces.IPiece) {
        }
    }
} 