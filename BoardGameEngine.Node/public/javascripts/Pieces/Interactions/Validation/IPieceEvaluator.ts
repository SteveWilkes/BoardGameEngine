module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceEvaluator {
        evaluate(subjectPiece: Piece): boolean
    }
}