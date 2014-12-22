module AgileObjects.StrategyGame.Game.Pieces {

    export class IsDroppableLocationValidator implements IPieceLocationValidator {
        constructor(
            private _sameTeamDroppablePieceDefinitionIds: Array<string>,
            private _otherTeamDroppablePieceDefinitionIds: Array<string>) { }

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            var isSameTeam = potentialLocation.piece.team === subjectPiece.team;

            var allowedPieceDefinitionIds = isSameTeam
                ? this._sameTeamDroppablePieceDefinitionIds
                : this._otherTeamDroppablePieceDefinitionIds;

            return allowedPieceDefinitionIds.indexOf(potentialLocation.piece.definitionId) > -1;
        }
    }
}