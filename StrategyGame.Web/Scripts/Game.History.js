var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var GameHistory = (function () {
                // ReSharper disable InconsistentNaming
                function GameHistory(_initialState, _gameActions) {
                    this._initialState = _initialState;
                    this._gameActions = _gameActions;
                    // ReSharper restore InconsistentNaming
                }
                return GameHistory;
            })();
            Game.GameHistory = GameHistory;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.History.js.map
