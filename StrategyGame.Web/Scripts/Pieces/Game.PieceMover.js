var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            (function (PieceMover) {
                var Implementation = (function () {
                    function Implementation(_locationsByCoordinates, events) {
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
                    Implementation.prototype._pieceSelected = function (origin) {
                        var validDestinations = origin.piece.movementProfile.getValidDestinations(origin, this._locationsByCoordinates);
                        this._currentPieceMovement = new Game.PieceMovement(origin, validDestinations);

                        return true;
                    };

                    Implementation.prototype._pieceMoved = function (destination) {
                        return this._currentPieceMovement.complete(destination);
                    };

                    Implementation.prototype._pieceDeselected = function () {
                        this._currentPieceMovement.cancel();
                        return true;
                    };
                    return Implementation;
                })();

                var Factory = (function () {
                    function Factory() {
                    }
                    Factory.prototype.create = function (tilesByCoordinates, events) {
                        return new Implementation(tilesByCoordinates, events);
                    };
                    return Factory;
                })();

                var factory = new Factory();

                function create(tilesByCoordinates, events) {
                    factory.create(tilesByCoordinates, events);
                }
                PieceMover.create = create;
            })(Game.PieceMover || (Game.PieceMover = {}));
            var PieceMover = Game.PieceMover;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceMover.js.map
