module AgileObjects.BoardGameEngine.Pieces {

    export interface IPieceLocationValidator {
        isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean
    }
}