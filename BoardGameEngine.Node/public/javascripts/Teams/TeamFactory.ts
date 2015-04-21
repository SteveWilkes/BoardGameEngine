module AgileObjects.BoardGameEngine.Teams {
    import Ts = TypeScript;

    export class TeamFactory {
        public createTeamFor(owner: ITeamOwner, teamNumber: number, pieceData: Pieces.PieceDataSet): Teams.Team {
            var pieceCoordinates = this._getPieceCoordinates(teamNumber, pieceData);

            var teamName = owner.id + " Team";
            var team = new Teams.Team(owner, teamName, pieceCoordinates);

            return team;
        }

        private _getPieceCoordinates(teamNumber: number, pieceData: Pieces.PieceDataSet): Ts.Dictionary<Pieces.Piece, Ts.Coordinates> {
            var pieceCoordinatesByPiece = new TypeScript.Dictionary<Pieces.Piece, TypeScript.Coordinates>();

            for (var i = 0; i < pieceData.configData.length; i++) {
                var pieceConfigData = pieceData.configData[i];
                var pieceDefinition = pieceData.definitions[pieceConfigData.pieceDefinitionId];
                var pieceId = teamNumber + "-" + pieceConfigData.pieceCoordinates.signature;
                var piece = pieceDefinition.createPiece(pieceId, teamNumber);
                pieceCoordinatesByPiece.add(piece, pieceConfigData.pieceCoordinates);
            }

            return pieceCoordinatesByPiece;
        }
    }
}
