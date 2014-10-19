var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardManager = (function () {
                // ReSharper disable InconsistentNaming
                function BoardManager(_$config) {
                    this._$config = _$config;
                    // ReSharper restore InconsistentNaming
                    this.board = new Game.Board(this._$config.gridSize);
                }
                return BoardManager;
            })();

            Game.game.service("$boardManager", [
                "$boardConfig",
                function ($config) {
                    return new BoardManager($config);
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardTilesManager.js.map
