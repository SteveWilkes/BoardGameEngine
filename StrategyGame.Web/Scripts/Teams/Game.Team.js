var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Team = (function () {
                function Team(_startingFormations) {
                    this._startingFormations = _startingFormations;
                }
                Team.prototype.getStartingFormation = function () {
                    return this._startingFormations[0];
                };
                return Team;
            })();
            Game.Team = Team;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Teams/Game.Team.js.map
