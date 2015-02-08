module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceEvaluator {
        isValid(subjectPiece: Piece): boolean
    }
}