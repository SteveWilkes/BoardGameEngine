var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMover = (function () {
                function PieceMover(_locationsByCoordinates, events) {
                    var _this = this;
                    this._locationsByCoordinates = _locationsByCoordinates;
                    events.pieceSelected.subscribe(function (tile) {
                        return _this._pieceSelected(tile);
                    });
                    events.pieceMoved.subscribe(function (tile) {
                        return _this._pieceMoved(tile);
                    });
                    events.pieceDeselected.subscribe(function () {
                        return _this._pieceDeselected();
                    });
                }
                PieceMover.prototype._pieceSelected = function (origin) {
                    var validDestinations = origin.piece.movementProfile.getValidDestinations(origin, this._locationsByCoordinates);
                    this._currentPieceMovement = new Game.PieceMovement(origin, validDestinations);

                    return true;
                };

                PieceMover.prototype._pieceMoved = function (destination) {
                    return this._currentPieceMovement.complete(destination);
                };

                PieceMover.prototype._pieceDeselected = function () {
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
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceMover.js.map
