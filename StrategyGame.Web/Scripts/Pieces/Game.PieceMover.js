var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceMover = (function () {
                function PieceMover(_locationsByCoordinates) {
                    this._locationsByCoordinates = _locationsByCoordinates;
                }
                PieceMover.prototype.pieceSelected = function (origin) {
                    var validDestinations = origin.piece.movementProfile.getValidDestinations(origin, this._locationsByCoordinates);
                    this._currentPieceMovement = new Game.PieceMovement(origin, validDestinations);
                };

                PieceMover.prototype.pieceMoved = function (destination) {
                    return this._currentPieceMovement.complete(destination);
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
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceMover.js.map
