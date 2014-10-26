module AgileObjects.StrategyGame.Game {

    class GameController {
        constructor($window: ng.IWindowService, $pieceFactory: PieceFactory, $scope: IGameScope) {
            var board = new Board(8);

            var team1TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(1, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(2, 1), $pieceFactory.createPiece("2")), // row 1
                new BoardTileConfig(coordinatesRegistry.get(1, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 1), $pieceFactory.createPiece("2")), // row 2
                new BoardTileConfig(coordinatesRegistry.get(2, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 3), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(4, 1), $pieceFactory.createPiece("2")), // row 3
                new BoardTileConfig(coordinatesRegistry.get(3, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 3), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 4), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(5, 1), $pieceFactory.createPiece("2")), // row 4
                new BoardTileConfig(coordinatesRegistry.get(4, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 3), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 4), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 5), $pieceFactory.createPiece("2"))];

            var team1StartingFormations = [new TeamStartingFormation(team1TileConfigs)];
            var team1 = new Team(team1StartingFormations);

            var team2TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(1, 1), $pieceFactory.createPiece("1")), // row 1
                new BoardTileConfig(coordinatesRegistry.get(1, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 1), $pieceFactory.createPiece("2")), // row 2
                new BoardTileConfig(coordinatesRegistry.get(2, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 3), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(4, 1), $pieceFactory.createPiece("2")), // row 3
                new BoardTileConfig(coordinatesRegistry.get(3, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 3), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 4), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(5, 1), $pieceFactory.createPiece("2")), // row 4
                new BoardTileConfig(coordinatesRegistry.get(4, 2), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(3, 3), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(2, 4), $pieceFactory.createPiece("2")),
                new BoardTileConfig(coordinatesRegistry.get(1, 5), $pieceFactory.createPiece("2"))];

            var team2StartingFormations = [new TeamStartingFormation(team2TileConfigs)];
            var team2 = new Team(team2StartingFormations);

            board.add(team1, boardPositions.north);
            board.add(team2, boardPositions.south);

            var container = new BoardContainer($window);
            var boardSizeDefaults = new BoardSizeDefaults(975, 50, 80, 2);
            var sizeManager = new BoardSizeManager(boardSizeDefaults, container);

            $scope.game = new Game(board, sizeManager);
            // BoardSizeManager
            // 
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", ["$window", "$pieceFactory", "$scope", GameController]);
}