module AgileObjects.BoardGameEngine.Teams {

    export class TeamFactory {
        public createTeamFor(owner: ITeamOwner, game: G.Game): Team {
            var pieceCoordinatesByPiece = this._getPieceCoordinatesByPiece(game);

            var teamName = owner.name.withOwnership() + " Team";
            var team = new Team(owner, teamName, pieceCoordinatesByPiece);

            return team;
        }

        private _getPieceCoordinatesByPiece(game: G.Game): Ts.Dictionary<Piece, Ts.Coordinates> {
            var pieceCoordinatesByPiece = new TypeScript.Dictionary<Piece, Ts.Coordinates>();
            var teamNumber = game.teams.length + 1;

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
