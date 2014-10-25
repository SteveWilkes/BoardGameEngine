var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var AnyDirectionMovementProfile = (function () {
                function AnyDirectionMovementProfile(_allowedDistance) {
                    this._allowedDistance = _allowedDistance;
                }
                AnyDirectionMovementProfile.prototype.getPossibleDestinations = function (origin) {
                    return [
                        origin.left(this._allowedDistance),
                        origin.upLeft(this._allowedDistance),
                        origin.up(this._allowedDistance),
                        origin.upRight(this._allowedDistance),
                        origin.right(this._allowedDistance),
                        origin.downRight(this._allowedDistance),
                        origin.down(this._allowedDistance),
                        origin.downLeft(this._allowedDistance)
                    ];
                };
                return AnyDirectionMovementProfile;
            })();
            Game.AnyDirectionMovementProfile = AnyDirectionMovementProfile;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.AnyDirectionMovementProfile.js.map
