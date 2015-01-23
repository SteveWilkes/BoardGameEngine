module AgileObjects.StrategyGame.Pieces {

    export interface IPieceOwner extends TypeScript.IEntity<string> {
        isLocal(): boolean;
        owns(piece: Piece): boolean;
    }
}