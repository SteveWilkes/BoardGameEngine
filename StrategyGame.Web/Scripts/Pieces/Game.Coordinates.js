var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Coordinates = (function () {
                function Coordinates(row, column, signature) {
                    if (typeof signature === "undefined") { signature = getSignature(row, column); }
                    this.row = row;
                    this.column = column;
                    this.signature = signature;
                    this.isEvenRow = this.row % 2 === 0;
                    this.isEvenColumn = this.column % 2 === 0;
                }
                Coordinates.prototype.left = function (distance) {
                    return new Coordinates(this.row, this.column - distance);
                };

                Coordinates.prototype.upLeft = function (distance) {
                    return new Coordinates(this.row - distance, this.column - distance);
                };

                Coordinates.prototype.up = function (distance) {
                    return new Coordinates(this.row - distance, this.column);
                };

                Coordinates.prototype.upRight = function (distance) {
                    return new Coordinates(this.row - distance, this.column + distance);
                };

                Coordinates.prototype.right = function (distance) {
                    return new Coordinates(this.row, this.column + distance);
                };

                Coordinates.prototype.downRight = function (distance) {
                    return new Coordinates(this.row + distance, this.column + distance);
                };

                Coordinates.prototype.down = function (distance) {
                    return new Coordinates(this.row + distance, this.column);
                };

                Coordinates.prototype.downLeft = function (distance) {
                    return new Coordinates(this.row + distance, this.column - distance);
                };
                return Coordinates;
            })();
            Game.Coordinates = Coordinates;

            var CoordinatesRegistry = (function () {
                function CoordinatesRegistry() {
                    this._coordinates = {};
                }
                CoordinatesRegistry.prototype.get = function (row, column) {
                    var signature = getSignature(row, column);
                    var coorindates = this._coordinates[signature];
                    if (coorindates === undefined) {
                        coorindates = this._coordinates[signature] = new Coordinates(row, column, signature);
                    }
                    return coorindates;
                };
                return CoordinatesRegistry;
            })();
            Game.CoordinatesRegistry = CoordinatesRegistry;

            function getSignature(row, column) {
                return row + "x" + column;
            }

            Game.coordinatesRegistry = new CoordinatesRegistry();
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.Coordinates.js.map
