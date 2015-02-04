module AgileObjects.BoardGameEngine.Teams {
    import Ts = TypeScript;

    export class TeamFactory {
        public createTeamFor(owner: ITeamOwner, teamNumber: number, teamConfigData: ITeamConfigData): Teams.Team {
            var piecesByLocation = this._getPiecesByLocation(teamNumber, teamConfigData);

            var teamName = owner.id + " Team";
            var team = new Teams.Team(owner, teamName, piecesByLocation);

            return team;
        }

        private _getPiecesByLocation(teamNumber: number, teamConfigData: ITeamConfigData): Ts.Dictionary<Ts.Coordinates, Pieces.Piece> {
            var piecesByLocation = new TypeScript.Dictionary<TypeScript.Coordinates, Pieces.Piece>();

            for (var i = 0; i < teamConfigData.pieceConfigData.length; i++) {
                var pieceConfigData = teamConfigData.pieceConfigData[i];
                var pieceDefinition = teamConfigData.pieceDefinitions[pieceConfigData.pieceDefinitionId];
                var pieceId = teamNumber + "-" + (i + 1);
                var piece = pieceDefinition.createPiece(pieceId, teamNumber);
                piecesByLocation.add(pieceConfigData.pieceLocation, piece);
            }

            return piecesByLocation;
        }
    }
}
