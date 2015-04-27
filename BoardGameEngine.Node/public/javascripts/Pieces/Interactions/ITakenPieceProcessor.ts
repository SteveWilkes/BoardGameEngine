module AgileObjects.BoardGameEngine.Pieces {

    export interface ITakenPieceProcessor {
        process(piece: Piece, originalPieceLocation: IPieceLocation): void;
    }
}