var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Tile = (function () {
                function Tile(row, column) {
                    this.row = row;
                    this.column = column;
                    var isEvenRow = row % 2 === 0;
                    var isEvenColumn = column % 2 === 0;
                    this.isDark = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);
                }
                return Tile;
            })();
            Game.Tile = Tile;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Tile.js.map
