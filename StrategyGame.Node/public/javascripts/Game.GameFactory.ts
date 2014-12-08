module AgileObjects.StrategyGame.Game {

    export interface IGameFactory {
        createNewGame(boardType: BoardType): Game;
    }

    export var gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(private _$window: ng.IWindowService, private _$pieceFactory: IPieceFactory) {
        }

        public createNewGame(boardType: BoardType): Game {
            var events = new EventSet();

            var boardSizeDefaults = new BoardSizeDefaults(950, 50, 80, 2);
            var container = new BoardDisplayDataService(this._$window);
            var sizeManager = new BoardDisplayManager(boardSizeDefaults, container, events);

            var team1TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("1")), // bomb
                new BoardTileConfig(coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")), // row 2
                new BoardTileConfig(coordinatesRegistry.get(2, 5), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 6), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")), // row 3
                new BoardTileConfig(coordinatesRegistry.get(3, 4), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 5), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 6), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 7), this._$pieceFactory.createPiece("2"))];

            var team1StartingFormation = new TeamStartingFormation(team1TileConfigs);
            var team1 = new Team(team1StartingFormation, true);

            var team2TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("1")), // bomb
                new BoardTileConfig(coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")), // row 2
                new BoardTileConfig(coordinatesRegistry.get(2, 5), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 6), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")), // row 3
                new BoardTileConfig(coordinatesRegistry.get(3, 4), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 5), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 6), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 7), this._$pieceFactory.createPiece("2"))];

            var team2StartingFormation = new TeamStartingFormation(team2TileConfigs);
            var team2 = new Team(team2StartingFormation, false);

            var teams = [team1, team2];

            var board = new Board(boardType, teams, events);

            var turnManager = new TurnManager(board, teams, 0, events);

            var game = new Game(sizeManager, board, turnManager, events);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, ["$window", pieceFactory, GameFactory]);
} 