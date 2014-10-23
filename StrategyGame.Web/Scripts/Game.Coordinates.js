var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Coordinates = (function () {
                function Coordinates(row, column) {
                    this.row = row;
                    this.column = column;
                    this._signature = row + "x" + column;
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

                Coordinates.prototype.toString = function () {
                    return this._signature;
                };
                return Coordinates;
            })();
            Game.Coordinates = Coordinates;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Coordinates.js.map
