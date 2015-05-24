module AgileObjects.BoardGameEngine.Teams {

    export class TeamFactory {
        public createTeamFor(owner: ITeamOwner, teamNumber: number, game: G.Game): Team {
            var pieceCoordinatesByPiece = this._getPieceCoordinatesByPiece(teamNumber, game);

            var teamName = owner.id + " Team";
            var team = new Teams.Team(owner, teamName, pieceCoordinatesByPiece);

            return team;
        }

        private _getPieceCoordinatesByPiece(teamNumber: number, game: G.Game): Ts.Dictionary<P.Piece, Ts.Coordinates> {
            var pieceCoordinatesByPiece = new TypeScript.Dictionary<P.Piece, TypeScript.Coordinates>();

            for (var i = 0; i < game.type.pieceData.configData.length; i++) {
                var pieceConfigData = game.type.pieceData.configData[i];
                var pieceDefinition = game.type.pieceData.definitions[pieceConfigData.pieceDefinitionId];
                var pieceId = teamNumber + "-" + (i + 1);
                var piece = pieceDefinition.createPiece(pieceId, teamNumber, game);
                pieceCoordinatesByPiece.add(piece, pieceConfigData.pieceCoordinates);
            }

            return pieceCoordinatesByPiece;
        }
    }
}
