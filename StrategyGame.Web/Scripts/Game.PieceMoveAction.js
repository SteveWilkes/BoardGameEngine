var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMoveAction = (function () {
                function PieceMoveAction(_origin, _destination) {
                    this._origin = _origin;
                    this._destination = _destination;
                }
                return PieceMoveAction;
            })();
            Game.PieceMoveAction = PieceMoveAction;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.PieceMoveAction.js.map
