var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardTilesManager = (function () {
                function BoardTilesManager() {
                }
                BoardTilesManager.prototype.createTileSet = function (gridSize) {
                    var tiles = new Array();
                    for (var row = 0; row < gridSize; row++) {
                        for (var column = 0; column < gridSize; column++) {
                            tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }
                    return tiles;
                };
                return BoardTilesManager;
            })();

            Game.game.factory("boardTilesManager", function () {
                return new BoardTilesManager();
            });
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardTiles.js.map
