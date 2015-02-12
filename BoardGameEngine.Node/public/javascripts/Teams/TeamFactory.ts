module AgileObjects.BoardGameEngine.Teams {
    import Ts = TypeScript;

    export class TeamFactory {
        public createTeamFor(owner: ITeamOwner, teamNumber: number, pieceData: Pieces.PieceDataSet): Teams.Team {
            var piecesByLocation = this._getPiecesByLocation(teamNumber, pieceData);

            var teamName = owner.id + " Team";
            var team = new Teams.Team(owner, teamName, piecesByLocation);

            return team;
        }

        private _getPiecesByLocation(teamNumber: number, pieceData: Pieces.PieceDataSet): Ts.Dictionary<Ts.Coordinates, Pieces.Piece> {
            var piecesByLocation = new TypeScript.Dictionary<TypeScript.Coordinates, Pieces.Piece>();

            for (var i = 0; i < pieceData.configData.length; i++) {
                var pieceConfigData = pieceData.configData[i];
                var pieceDefinition = pieceData.definitions[pieceConfigData.pieceDefinitionId];
                var pieceId = teamNumber + "-" + (i + 1);
                var piece = pieceDefinition.createPiece(pieceId, teamNumber);
                piecesByLocation.add(pieceConfigData.pieceLocation, piece);
            }

            return piecesByLocation;
        }
    }
}
