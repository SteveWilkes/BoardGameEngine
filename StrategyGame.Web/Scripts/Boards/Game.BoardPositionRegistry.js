var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardPositionRegistry = (function () {
                function BoardPositionRegistry() {
                    this.north = new Game.BoardPosition(function (c) {
                        return c;
                    });
                    this.south = new Game.BoardPosition(function (c, gridSize) {
                        return Game.coordinatesRegistry.get(gridSize - (c.column - 1), gridSize - (c.row - 1));
                    });
                }
                return BoardPositionRegistry;
            })();
            Game.BoardPositionRegistry = BoardPositionRegistry;

            Game.boardPositions = new BoardPositionRegistry();
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardPositionRegistry.js.map
