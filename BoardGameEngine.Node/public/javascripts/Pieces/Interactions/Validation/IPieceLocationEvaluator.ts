module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceLocationEvaluator {
        isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean
    }
}