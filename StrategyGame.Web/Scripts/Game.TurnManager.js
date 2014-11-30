var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var TurnManager = (function () {
                function TurnManager(events) {
                    var _this = this;
                    this._teams = new Array();

                    events.teamLoaded.subscribe(function (team) {
                        _this._teams.push(team);
                        return true;
                    });

                    events.pieceMoving.subscribe(function (originTile) {
                        return true;
                    });
                }
                return TurnManager;
            })();
            Game.TurnManager = TurnManager;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.TurnManager.js.map
