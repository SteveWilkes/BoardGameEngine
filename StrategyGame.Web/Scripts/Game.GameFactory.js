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
                GameFactory.prototype.createNewGame = function (boardType) {
                    var events = new Game.EventSet();

                    var turnManager = new Game.TurnManager(events);

                    var board = new Game.Board(boardType, events);

                    var team1TileConfigs = [
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 5), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 6), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 5), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 6), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 7), this._$pieceFactory.createPiece("2"))];

                    var team1StartingFormations = [new Game.TeamStartingFormation(team1TileConfigs)];
                    var team1 = new Game.Team(team1StartingFormations);

                    var team2TileConfigs = [
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(1, 5), this._$pieceFactory.createPiece("1")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 5), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(2, 6), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 3), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 4), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 5), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 6), this._$pieceFactory.createPiece("2")),
                        new Game.BoardTileConfig(Game.coordinatesRegistry.get(3, 7), this._$pieceFactory.createPiece("2"))];

                    var team2StartingFormations = [new Game.TeamStartingFormation(team2TileConfigs)];
                    var team2 = new Game.Team(team2StartingFormations);

                    events.teamLoaded.publish(team1);
                    events.teamLoaded.publish(team2);

                    board.add(team1, Game.boardPositions.north);
                    board.add(team2, Game.boardPositions.south);

                    var container = new Game.BoardContainer(this._$window);
                    var boardSizeDefaults = new Game.BoardSizeDefaults(975, 50, 80, 2);
                    var sizeManager = new Game.BoardSizeManager(boardSizeDefaults, container, events);

                    return new Game.Game(board, turnManager, sizeManager, events);
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
