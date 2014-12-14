module AgileObjects.StrategyGame.Game.Teams {
    import Pieces = StrategyGame.Game.Pieces;
    import Players = StrategyGame.Game.Players;
    import Ts = TypeScript;

    export interface ITeamFactory {
        createTeam(player: Players.IPlayer, boardTypeId: string): Teams.Team;
    }

    export var teamFactory = "$teamFactory";

    export class TeamFactory implements ITeamFactory {
        constructor(private _$pieceFactory: Pieces.IPieceFactory) { }

        public createTeam(player: Players.IPlayer, boardTypeId: string): Teams.Team {
            var pieceLocationConfigs = this._getPieceLocationConfigs();

            var team = new Teams.Team(player.id + " Team", pieceLocationConfigs, player);

            return team;
        }

        private _getPieceLocationConfigs(): Array<Pieces.PieceLocationConfig> {
            var configData = this._getPieceLocationConfigData();
            var locationConfigs = new Array<Pieces.PieceLocationConfig>();

            for (var i = 0; i < configData.length; i++) {
                var data = configData[i];
                locationConfigs.push(
                    new Pieces.PieceLocationConfig(
                        Ts.coordinatesRegistry.get(data.row, data.column),
                        this._$pieceFactory.createPiece(data.pieceDefinitionId)));
            }

            return locationConfigs;
        }

        private _getPieceLocationConfigData(): Array<Pieces.PieceLocationConfigData> {
            return [
                { row: 1, column: 5, pieceDefinitionId: "1" }, // bomb
                { row: 2, column: 4, pieceDefinitionId: "2" }, // row 2
                { row: 2, column: 5, pieceDefinitionId: "2" },
                { row: 2, column: 6, pieceDefinitionId: "2" },
                { row: 3, column: 3, pieceDefinitionId: "2" }, // row 3
                { row: 3, column: 4, pieceDefinitionId: "2" },
                { row: 3, column: 5, pieceDefinitionId: "2" },
                { row: 3, column: 6, pieceDefinitionId: "2" },
                { row: 3, column: 7, pieceDefinitionId: "2" }];
        }
    }

    angular
        .module(strategyGameApp)
        .service(teamFactory, [Pieces.pieceFactory, TeamFactory]);
}
