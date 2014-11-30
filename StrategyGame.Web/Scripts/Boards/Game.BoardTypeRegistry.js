var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardTypeRegistry = (function () {
                function BoardTypeRegistry() {
                    this.diamond = new Game.BoardType(9, [
                        new Game.BoardRowConfig([false, false, false, false, true, false, false, false, false]),
                        new Game.BoardRowConfig([false, false, false, true, true, true, false, false, false]),
                        new Game.BoardRowConfig([false, false, true, true, true, true, true, false, false]),
                        new Game.BoardRowConfig([false, true, true, true, true, true, true, true, false]),
                        new Game.BoardRowConfig([true, true, true, true, true, true, true, true, true]),
                        new Game.BoardRowConfig([false, true, true, true, true, true, true, true, false]),
                        new Game.BoardRowConfig([false, false, true, true, true, true, true, false, false]),
                        new Game.BoardRowConfig([false, false, false, true, true, true, false, false, false]),
                        new Game.BoardRowConfig([false, false, false, false, true, false, false, false, false])
                    ]);
                }
                return BoardTypeRegistry;
            })();
            Game.BoardTypeRegistry = BoardTypeRegistry;

            Game.boardTypeRegistry = new BoardTypeRegistry();
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardTypeRegistry.js.map
