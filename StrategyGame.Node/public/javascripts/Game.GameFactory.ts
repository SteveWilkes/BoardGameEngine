module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Pieces = StrategyGame.Game.Pieces;
    import Status = StrategyGame.Game.Status;
    import Teams = StrategyGame.Game.Teams;
    import Ts = TypeScript;

    export interface IGameFactory {
        createNewGame(boardType: Boards.BoardType): Game;
    }

    export var gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(private _$window: ng.IWindowService, private _$pieceFactory: Pieces.IPieceFactory) {
        }

        public createNewGame(boardType: Boards.BoardType): Game {
            var events = new EventSet();

            var boardSizeDefaults = new Boards.BoardSizeDefaults(950, 50, 80, 2);
            var container = new Boards.BoardDisplayDataService(this._$window);
            var sizeManager = new Boards.BoardDisplayManager(boardSizeDefaults, container, events);

            var team1TileConfigs = [
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("1")), // bomb
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")), // row 2
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(2, 5), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(2, 6), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")), // row 3
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 4), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 5), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 6), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 7), this._$pieceFactory.createPiece("2"))];

            var team1StartingFormation = new Teams.TeamStartingFormation(team1TileConfigs);
            var team1 = new Teams.Team("Team 1", team1StartingFormation, true);

            var team2TileConfigs = [
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("1")), // bomb
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")), // row 2
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(2, 5), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(2, 6), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")), // row 3
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 4), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 5), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 6), this._$pieceFactory.createPiece("2")),
                new Teams.BoardTileConfig(Ts.coordinatesRegistry.get(3, 7), this._$pieceFactory.createPiece("2"))];

            var team2StartingFormation = new Teams.TeamStartingFormation(team2TileConfigs);
            var team2 = new Teams.Team("Team 2", team2StartingFormation, false);

            var teams = [team1, team2];

            var board = new Boards.Board(boardType, teams, events);

            var turnManager = new Status.TurnManager(board, teams, 0, events);

            var game = new Game(sizeManager, board, turnManager, events);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, ["$window", Pieces.pieceFactory, GameFactory]);
} 