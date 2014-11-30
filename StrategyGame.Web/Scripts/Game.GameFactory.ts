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

            var turnManager = new TurnManager(events);

            var board = new Board(boardType, events);

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

            var team1StartingFormations = [new TeamStartingFormation(team1TileConfigs)];
            var team1 = new Team(team1StartingFormations);

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

            var team2StartingFormations = [new TeamStartingFormation(team2TileConfigs)];
            var team2 = new Team(team2StartingFormations);

            events.teamLoaded.publish(team1);
            events.teamLoaded.publish(team2);

            board.add(team1, boardPositions.north);
            board.add(team2, boardPositions.south);

            var container = new BoardContainer(this._$window);
            var boardSizeDefaults = new BoardSizeDefaults(975, 50, 80, 2);
            var sizeManager = new BoardSizeManager(boardSizeDefaults, container, events);

            return new Game(board, turnManager, sizeManager, events);
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, ["$window", pieceFactory, GameFactory]);
} 