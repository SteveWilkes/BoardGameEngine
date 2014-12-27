module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceOwner {
        owns(piece: Piece): boolean;
        pieceTaken(takenPiece: Piece): void;
    }
}