module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceLocationEvaluator {
        isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean
    }
}