var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardContainer = (function () {
                // ReSharper disable InconsistentNaming
                function BoardContainer(_$window) {
                    this._$window = _$window;
                    // ReSharper restore InconsistentNaming
                }
                BoardContainer.prototype.getSize = function () {
                    return Math.min(this._$window.innerWidth, this._$window.innerHeight);
                };
                return BoardContainer;
            })();

            Game.game.service("$boardContainer", ["$window", BoardContainer]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardContainer.js.map
