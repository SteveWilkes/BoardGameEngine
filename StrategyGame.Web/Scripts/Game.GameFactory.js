var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.gameFactory = "$gameFactory";

            var GameFactory = (function () {
                function GameFactory(_$window, _$pieceFactory) {
                    this._$window = _$window;
                    this._$pieceFactory = _$pieceFactory;
                }
                GameFactory.prototype.createNewGame = function (gridSize) {
                    var board = new Game.Board(gridSize);

                    var team1TileConfigs = [
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 1), this._$pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(4, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(5, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(4, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("2"))];

                    var team1StartingFormations = [new Game.TeamStartingFormation(team1TileConfigs)];
                    var team1 = new Game.Team(team1StartingFormations);

                    var team2TileConfigs = [
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 1), this._$pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(4, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(5, 1), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(4, 2), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("2"))];

                    var team2StartingFormations = [new Game.TeamStartingFormation(team2TileConfigs)];
                    var team2 = new Game.Team(team2StartingFormations);

                    board.add(team1, Game.boardPositions.north);
                    board.add(team2, Game.boardPositions.south);

                    var container = new Game.BoardContainer(this._$window);
                    var boardSizeDefaults = new Game.BoardSizeDefaults(975, 50, 80, 2);
                    var sizeManager = new Game.BoardSizeManager(boardSizeDefaults, container);

                    return new Game.Game(board, sizeManager);
                };
                return GameFactory;
            })();

            angular.module(Game.strategyGameApp).service(Game.gameFactory, ["$window", Game.pieceFactory, GameFactory]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.GameFactory.js.map
