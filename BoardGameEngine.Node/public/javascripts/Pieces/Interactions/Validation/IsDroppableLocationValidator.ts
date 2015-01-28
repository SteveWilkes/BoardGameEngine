module AgileObjects.BoardGameEngine.Pieces {

    // TODO: Rename this - it isn't only about dropping
    export class IsDroppableLocationValidator implements IPieceLocationValidator {
        private _allSameTeamPiecesAllowed: boolean;
        private _allOtherTeamPiecesAllowed: boolean;

        constructor(
            private _sameTeamDroppablePieceDefinitionIds: Array<string>,
            private _otherTeamDroppablePieceDefinitionIds: Array<string>) {

            this._allSameTeamPiecesAllowed = this._sameTeamDroppablePieceDefinitionIds.indexOf("*") === 0;
            this._allOtherTeamPiecesAllowed = this._otherTeamDroppablePieceDefinitionIds.indexOf("*") === 0;
        }

        public isValid(potentialLocation: IPieceLocation, subjectPiece: Piece): boolean {
            var isSameTeam = potentialLocation.piece.team === subjectPiece.team;

            if ((isSameTeam && this._allSameTeamPiecesAllowed) ||
                (!isSameTeam && this._allOtherTeamPiecesAllowed)) {
                return true;
            }

            var allowedPieceDefinitionIds = isSameTeam
                ? this._sameTeamDroppablePieceDefinitionIds
                : this._otherTeamDroppablePieceDefinitionIds;

            return allowedPieceDefinitionIds.indexOf(potentialLocation.piece.definitionId) > -1;
        }
    }
}