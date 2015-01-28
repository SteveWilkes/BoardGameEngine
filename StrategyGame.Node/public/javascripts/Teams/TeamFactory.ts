module AgileObjects.BoardGameEngine.Teams {
    import Pieces = BoardGameEngine.Pieces;
    import Players = BoardGameEngine.Players;
    import Ts = TypeScript;

    export interface ITeamFactory {
        createTeam(player: Players.IPlayer, gameTypeId: string): Teams.Team;
    }

    export class TeamFactory implements ITeamFactory {
        constructor(private _pieceFactory: Pieces.IPieceFactory) { }

        public createTeam(owner: ITeamOwner, gameTypeId: string): Teams.Team {
            var piecesByLocation = this._getPiecesByLocation();

            var teamId = owner.getNextTeamId();
            var teamName = owner.id + " Team";
            var team = new Teams.Team(teamId, teamName, piecesByLocation);

            owner.add(team);

            return team;
        }

        private _getPiecesByLocation(): TypeScript.Dictionary<TypeScript.Coordinates, Pieces.Piece> {
            var configData = this._getPieceLocationConfigData();
            var piecesByLocation = new TypeScript.Dictionary<TypeScript.Coordinates, Pieces.Piece>();

            for (var i = 0; i < configData.length; i++) {
                var data = configData[i];
                var pieceLocation = Ts.coordinatesRegistry.get(data.row, data.column);
                var piece = this._pieceFactory.createPiece(data.pieceDefinitionId);
                piecesByLocation.add(pieceLocation, piece);
            }

            return piecesByLocation;
        }

        private _getPieceLocationConfigData(): Array<Pieces.PieceLocationConfigData> {
            // TODO: Retrieve specific to GameType:
            return [
                { row: 1, column: 5, pieceDefinitionId: "1" }, // bomb
                { row: 2, column: 4, pieceDefinitionId: "2" }, // row 2
                { row: 2, column: 5, pieceDefinitionId: "2" },
                { row: 2, column: 6, pieceDefinitionId: "2" },
                { row: 3, column: 3, pieceDefinitionId: "3" }, // row 3
                { row: 3, column: 4, pieceDefinitionId: "3" },
                { row: 3, column: 5, pieceDefinitionId: "3" },
                { row: 3, column: 6, pieceDefinitionId: "3" },
                { row: 3, column: 7, pieceDefinitionId: "3" }];
        }
    }
}
