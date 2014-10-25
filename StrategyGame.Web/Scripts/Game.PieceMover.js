var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMover = (function () {
                // ReSharper disable InconsistentNaming
                function PieceMover(_tilesByCoordinates) {
                    this._tilesByCoordinates = _tilesByCoordinates;
                    // ReSharper restore InconsistentNaming
                }
                PieceMover.prototype.pieceSelected = function (originTile) {
                    var possibleDestinations = originTile.piece.movementProfile.getPossibleDestinations(originTile.position);
                    var validDestinationTiles = new Array();
                    for (var i = 0; i < possibleDestinations.length; i++) {
                        var destinationTile = this._tilesByCoordinates[possibleDestinations[i].signature];

                        // ReSharper disable once QualifiedExpressionMaybeNull
                        if (destinationTile !== undefined && !destinationTile.isOccupied()) {
                            validDestinationTiles.push(destinationTile);
                        }
                    }
                    this._currentPieceMovement = new Game.PieceMovement(originTile, validDestinationTiles);
                };

                PieceMover.prototype.pieceMoved = function (destinationTile) {
                    return this._currentPieceMovement.complete(destinationTile);
                };

                PieceMover.prototype.pieceDeselected = function () {
                    this._currentPieceMovement.cancel();
                    return true;
                };
                return PieceMover;
            })();
            Game.PieceMover = PieceMover;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.PieceMover.js.map
