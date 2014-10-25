var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMovement = (function () {
                function PieceMovement(_originTile, _validDestinationTiles) {
                    this._originTile = _originTile;
                    this._validDestinationTiles = _validDestinationTiles;
                    this._setDestinationTileStates(true);
                }
                PieceMovement.prototype.cancel = function () {
                    this._setDestinationTileStates(false);
                };

                PieceMovement.prototype.complete = function (destinationTile) {
                    if (this._moveResult !== undefined) {
                        return this._moveResult;
                    }

                    this._moveResult = false;

                    if (destinationTile === this._originTile) {
                        this._moveResult = true;
                    } else if (this._validDestinationTiles.indexOf(destinationTile) > -1) {
                        this._originTile.movePieceTo(destinationTile);
                        this._moveResult = true;
                    }

                    this._setDestinationTileStates(false);

                    return this._moveResult;
                };

                PieceMovement.prototype._setDestinationTileStates = function (isPotentialDestination) {
                    for (var i = 0; i < this._validDestinationTiles.length; i++) {
                        this._validDestinationTiles[i].isPotentialDestination = isPotentialDestination;
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
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.PieceMovement.js.map
