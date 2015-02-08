module AgileObjects.BoardGameEngine.Pieces {

    export class OccupiedTargetLocationEvaluator implements IPieceAndLocationEvaluator {
        private _allSameTeamPiecesAllowed: boolean;
        private _allOtherTeamPiecesAllowed: boolean;

        constructor(
            private _allowedSameTeamPieceDefinitionIds: Array<string>,
            private _allowedOtherTeamPieceDefinitionIds: Array<string>) {

            this._allSameTeamPiecesAllowed = this._allowedSameTeamPieceDefinitionIds.indexOf("*") === 0;
            this._allOtherTeamPiecesAllowed = this._allowedOtherTeamPieceDefinitionIds.indexOf("*") === 0;
        }

        public isValid(subjectPiece: Piece, targetLocation: IPieceLocation): boolean {
            if (!targetLocation.isOccupied()) { return false; }

            var isSameTeam = targetLocation.piece.team === subjectPiece.team;

            if ((isSameTeam && this._allSameTeamPiecesAllowed) ||
                (!isSameTeam && this._allOtherTeamPiecesAllowed)) {
                return true;
            }

            var allowedPieceDefinitionIds = isSameTeam
                ? this._allowedSameTeamPieceDefinitionIds
                : this._allowedOtherTeamPieceDefinitionIds;

            return allowedPieceDefinitionIds.indexOf(targetLocation.piece.definitionId) > -1;
        }
    }
}