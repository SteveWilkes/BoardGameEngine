var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var AnyDirectionMovementProfile = (function () {
                function AnyDirectionMovementProfile(_allowedDistance, _movementFilters) {
                    this._allowedDistance = _allowedDistance;
                    this._movementFilters = _movementFilters;
                }
                AnyDirectionMovementProfile.prototype.getValidDestinations = function (origin, allLocations) {
                    var destinations = [
                        allLocations[origin.position.left(this._allowedDistance).signature],
                        allLocations[origin.position.upLeft(this._allowedDistance).signature],
                        allLocations[origin.position.up(this._allowedDistance).signature],
                        allLocations[origin.position.upRight(this._allowedDistance).signature],
                        allLocations[origin.position.right(this._allowedDistance).signature],
                        allLocations[origin.position.downRight(this._allowedDistance).signature],
                        allLocations[origin.position.down(this._allowedDistance).signature],
                        allLocations[origin.position.downLeft(this._allowedDistance).signature]
                    ];
                    for (var i = 0; i < this._movementFilters.length; i++) {
                        destinations = this._movementFilters[i].filter(destinations);
                    }
                    return destinations;
                };
                return AnyDirectionMovementProfile;
            })();
            Game.AnyDirectionMovementProfile = AnyDirectionMovementProfile;

            var OnlyValidLocationsPieceMovementFilter = (function () {
                function OnlyValidLocationsPieceMovementFilter() {
                }
                OnlyValidLocationsPieceMovementFilter.prototype.filter = function (possibleDestinations) {
                    var validDestinations = new Array();
                    for (var i = 0; i < possibleDestinations.length; i++) {
                        if (possibleDestinations[i] !== undefined) {
                            validDestinations.push(possibleDestinations[i]);
                        }
                    }
                    return validDestinations;
                };
                return OnlyValidLocationsPieceMovementFilter;
            })();
            Game.OnlyValidLocationsPieceMovementFilter = OnlyValidLocationsPieceMovementFilter;

            var OnlyEmptyLocationsPieceMovementFilter = (function () {
                function OnlyEmptyLocationsPieceMovementFilter() {
                }
                OnlyEmptyLocationsPieceMovementFilter.prototype.filter = function (possibleDestinations) {
                    var emptyDestinations = new Array();
                    for (var i = 0; i < possibleDestinations.length; i++) {
                        if (!possibleDestinations[i].isOccupied()) {
                            emptyDestinations.push(possibleDestinations[i]);
                        }
                    }
                    return emptyDestinations;
                };
                return OnlyEmptyLocationsPieceMovementFilter;
            })();
            Game.OnlyEmptyLocationsPieceMovementFilter = OnlyEmptyLocationsPieceMovementFilter;

            var OnlyOccupiedLocationsPieceMovementFilter = (function () {
                function OnlyOccupiedLocationsPieceMovementFilter() {
                }
                OnlyOccupiedLocationsPieceMovementFilter.prototype.filter = function (possibleDestinations) {
                    var occupiedDestinations = new Array();
                    for (var i = 0; i < possibleDestinations.length; i++) {
                        if (possibleDestinations[i].isOccupied()) {
                            occupiedDestinations.push(possibleDestinations[i]);
                        }
                    }
                    return occupiedDestinations;
                };
                return OnlyOccupiedLocationsPieceMovementFilter;
            })();
            Game.OnlyOccupiedLocationsPieceMovementFilter = OnlyOccupiedLocationsPieceMovementFilter;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.AnyDirectionMovementProfile.js.map
