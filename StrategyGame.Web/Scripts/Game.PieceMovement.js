var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMovement = (function () {
                // ReSharper disable InconsistentNaming
                function PieceMovement(_originTile, _validDestinationTiles) {
                    this._originTile = _originTile;
                    this._validDestinationTiles = _validDestinationTiles;
                    // ReSharper restore InconsistentNaming
                }
                PieceMovement.prototype.complete = function (destinationTile) {
                    if (destinationTile === this._originTile) {
                        return true;
                    }
                    if (this._validDestinationTiles.indexOf(destinationTile) === -1) {
                        return false;
                    }

                    this._originTile.pieceMovedTo(destinationTile);
                    return true;
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
