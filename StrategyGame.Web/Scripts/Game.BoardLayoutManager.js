var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardLayoutManager = (function () {
                // ReSharper disable InconsistentNaming
                function BoardLayoutManager(_$window, _$config, _$boardManager) {
                    this._$window = _$window;
                    this._$config = _$config;
                    this._$boardManager = _$boardManager;
                    // ReSharper restore InconsistentNaming
                    this._resizeTiles();
                }
                BoardLayoutManager.prototype.handleEvent = function () {
                    this._resizeTiles();
                };

                BoardLayoutManager.prototype._resizeTiles = function () {
                    this._$boardManager.board.resizeTo(this._$window.innerHeight);
                };
                return BoardLayoutManager;
            })();

            Game.game.factory("$boardLayoutManager", [
                "$window", "$boardConfig", "$boardManager",
                function ($window, $config, $boardManager) {
                    return new BoardLayoutManager($window, $config, $boardManager);
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardLayoutManager.js.map
