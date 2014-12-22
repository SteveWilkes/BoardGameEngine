module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPieceLocationValidator {
        isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean
    }
}