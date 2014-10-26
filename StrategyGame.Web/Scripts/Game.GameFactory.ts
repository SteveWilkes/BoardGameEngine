module AgileObjects.StrategyGame.Game {

    export interface IGameFactory {
        createNewGame(gridSize: number): Game;
    }

    export var gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(private _$window: ng.IWindowService, private _$pieceFactory: IPieceFactory) {
        }

        public createNewGame(gridSize: number): Game {
            var board = new Board(gridSize);

            var team1TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(1, 1), this._$pieceFactory.createPiece("1")), // bomb
                new BoardTileConfig(coordinatesRegistry.get(2, 1), this._$pieceFactory.createPiece("2")), // row 1
                new BoardTileConfig(coordinatesRegistry.get(1, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 1), this._$pieceFactory.createPiece("2")), // row 2
                new BoardTileConfig(coordinatesRegistry.get(2, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 3), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(4, 1), this._$pieceFactory.createPiece("2")), // row 3
                new BoardTileConfig(coordinatesRegistry.get(3, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 3), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 4), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(5, 1), this._$pieceFactory.createPiece("2")), // row 4
                new BoardTileConfig(coordinatesRegistry.get(4, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("2"))];

            var team1StartingFormations = [new TeamStartingFormation(team1TileConfigs)];
            var team1 = new Team(team1StartingFormations);

            var team2TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(1, 1), this._$pieceFactory.createPiece("1")), // bomb
                new BoardTileConfig(coordinatesRegistry.get(2, 1), this._$pieceFactory.createPiece("2")), // row 1
                new BoardTileConfig(coordinatesRegistry.get(1, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 1), this._$pieceFactory.createPiece("2")), // row 2
                new BoardTileConfig(coordinatesRegistry.get(2, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 3), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(4, 1), this._$pieceFactory.createPiece("2")), // row 3
                new BoardTileConfig(coordinatesRegistry.get(3, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 3), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 4), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(5, 1), this._$pieceFactory.createPiece("2")), // row 4
                new BoardTileConfig(coordinatesRegistry.get(4, 2), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("2"))];

            var team2StartingFormations = [new TeamStartingFormation(team2TileConfigs)];
            var team2 = new Team(team2StartingFormations);

            board.add(team1, boardPositions.north);
            board.add(team2, boardPositions.south);

            var container = new BoardContainer(this._$window);
            var boardSizeDefaults = new BoardSizeDefaults(975, 50, 80, 2);
            var sizeManager = new BoardSizeManager(boardSizeDefaults, container);

            return new Game(board, sizeManager);
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, ["$window", pieceFactory, GameFactory]);
} 