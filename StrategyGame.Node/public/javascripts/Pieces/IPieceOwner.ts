module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceOwner extends TypeScript.IEntity<string> {
        isLocal(): boolean;
        owns(piece: Piece): boolean;
    }
}