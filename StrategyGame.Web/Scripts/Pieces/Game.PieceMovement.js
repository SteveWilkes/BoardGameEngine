var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMovement = (function () {
                function PieceMovement(_origin, _validDestinations) {
                    this._origin = _origin;
                    this._validDestinations = _validDestinations;
                    this._setDestinationStates(true);
                }
                PieceMovement.prototype.cancel = function () {
                    this._setDestinationStates(false);
                };

                PieceMovement.prototype.complete = function (destination) {
                    if (this._moveResult !== undefined) {
                        return this._moveResult;
                    }

                    this._moveResult = false;

                    if (destination === this._origin) {
                        this._moveResult = true;
                    } else if (this._validDestinations.indexOf(destination) > -1) {
                        this._origin.movePieceTo(destination);
                        this._moveResult = true;
                    }

                    this._setDestinationStates(false);

                    return this._moveResult;
                };

                PieceMovement.prototype._setDestinationStates = function (isPotentialDestination) {
                    for (var i = 0; i < this._validDestinations.length; i++) {
                        this._validDestinations[i].isPotentialDestination = isPotentialDestination;
                    }
                };
                return PieceMovement;
            })();
            Game.PieceMovement = PieceMovement;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceMovement.js.map
