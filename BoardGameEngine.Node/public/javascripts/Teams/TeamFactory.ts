module AgileObjects.BoardGameEngine.Teams {

    export class TeamFactory {
        public createTeamFor(owner: ITeamOwner, teamNumber: number, pieceData: P.PieceDataSet): Team {
            var pieceCoordinates = this._getPieceCoordinates(teamNumber, pieceData);

            var teamName = owner.id + " Team";
            var team = new Teams.Team(owner, teamName, pieceCoordinates);

            return team;
        }

        private _getPieceCoordinates(teamNumber: number, pieceData: P.PieceDataSet): Ts.Dictionary<P.Piece, Ts.Coordinates> {
            var pieceCoordinatesByPiece = new TypeScript.Dictionary<P.Piece, TypeScript.Coordinates>();

            for (var i = 0; i < pieceData.configData.length; i++) {
                var pieceConfigData = pieceData.configData[i];
                var pieceDefinition = pieceData.definitions[pieceConfigData.pieceDefinitionId];
                var pieceId = teamNumber + "-" + (i + 1);
                var piece = pieceDefinition.createPiece(pieceId, teamNumber);
                pieceCoordinatesByPiece.add(piece, pieceConfigData.pieceCoordinates);
            }

            return pieceCoordinatesByPiece;
        }
    }
}
