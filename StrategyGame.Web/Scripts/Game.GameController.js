var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var GameController = (function () {
                function GameController($window, $pieceFactory, $scope) {
                    var container = new Game.BoardContainer($window);
                    var boardSizeDefaults = new Game.BoardSizeDefaults(975, 50, 80, 2);
                    var boardSizeSet = new Game.BoardSizeSet(boardSizeDefaults, 8);
                    var board = new Game.Board(container, boardSizeSet);

                    var team1TileConfigs = [
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 1), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 2), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 1), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 2), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 3), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(4, 1), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 2), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 3), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 4), $pieceFactory.createPiece("1"))];

                    var team1StartingFormations = [new Game.TeamStartingFormation(team1TileConfigs)];
                    var team1 = new Game.Team(team1StartingFormations);

                    var team2TileConfigs = [
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 1), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 2), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 1), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 2), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 3), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(4, 1), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 2), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 3), $pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 4), $pieceFactory.createPiece("1"))];

                    var team2StartingFormations = [new Game.TeamStartingFormation(team2TileConfigs)];
                    var team2 = new Game.Team(team2StartingFormations);

                    board.add(team1, Game.boardPositions.north);
                    board.add(team2, Game.boardPositions.south);

                    $scope.game = new Game.Game(board);
                    // BoardSizeManager
                    //
                }
                return GameController;
            })();

            Game.game.controller("GameController", ["$window", "$pieceFactory", "$scope", GameController]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.GameController.js.map
