module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceAndLocationEvaluator {
        isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean
    }
}