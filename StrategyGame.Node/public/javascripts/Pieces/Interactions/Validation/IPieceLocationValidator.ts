module AgileObjects.StrategyGame.Pieces {

    export interface IPieceLocationValidator {
        isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean
    }
}