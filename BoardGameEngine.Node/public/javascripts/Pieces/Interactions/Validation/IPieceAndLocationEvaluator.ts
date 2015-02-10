module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceAndLocationEvaluator {
        evaluate(subjectPiece: Piece, targetLocation: IPieceLocation): boolean
    }
}