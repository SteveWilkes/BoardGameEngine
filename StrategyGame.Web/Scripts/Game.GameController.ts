module AgileObjects.StrategyGame.Game {

    class GameController {
        constructor($window: ng.IWindowService, $pieceFactory: PieceFactory, $scope: IGameScope) {
            var container = new BoardContainer($window);
            var boardSizeDefaults = new BoardSizeDefaults(975, 50, 80, 2);
            var boardSizeSet = new BoardSizeSet(boardSizeDefaults, 8);
            var board = new Board(container, boardSizeSet);

            var team1TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(2, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(1, 2), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(3, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(2, 2), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(1, 3), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(4, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(3, 2), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(2, 3), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(1, 4), $pieceFactory.createPiece("1"))];

            var team1StartingFormations = [new TeamStartingFormation(team1TileConfigs)];
            var team1 = new Team(team1StartingFormations);

            var team2TileConfigs = [
                new BoardTileConfig(coordinatesRegistry.get(2, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(1, 2), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(3, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(2, 2), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(1, 3), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(4, 1), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(3, 2), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(2, 3), $pieceFactory.createPiece("1")),
                new BoardTileConfig(coordinatesRegistry.get(1, 4), $pieceFactory.createPiece("1"))];

            var team2StartingFormations = [new TeamStartingFormation(team2TileConfigs)];
            var team2 = new Team(team2StartingFormations);

            board.add(team1, boardPositions.north);
            board.add(team2, boardPositions.south);

            $scope.game = new Game(board);
            // BoardSizeManager
            // 
        }
    }

    game.controller("GameController", ["$window", "$pieceFactory", "$scope", GameController]);
}