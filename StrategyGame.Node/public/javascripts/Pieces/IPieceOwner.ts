module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceOwner {
        isLocal(): boolean;
        owns(piece: Piece): boolean;
    }
}