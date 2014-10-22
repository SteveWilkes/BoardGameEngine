var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var MovementProfileBase = (function () {
                function MovementProfileBase() {
                }
                MovementProfileBase.prototype.getPossibleDestinations = function (origin) {
                };
                return MovementProfileBase;
            })();
            Game.MovementProfileBase = MovementProfileBase;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.MovementProfileBase.js.map
