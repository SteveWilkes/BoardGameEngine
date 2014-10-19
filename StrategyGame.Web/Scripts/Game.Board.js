var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                function Board(gridSize) {
                    this.tiles = new Array();
                    for (var row = 0; row < gridSize; row++) {
                        for (var column = 0; column < gridSize; column++) {
                            this.tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }
                }
                return Board;
            })();
            Game.Board = Board;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Board.js.map
