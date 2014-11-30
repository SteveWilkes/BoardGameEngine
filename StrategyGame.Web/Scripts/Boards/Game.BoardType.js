var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardType = (function () {
                function BoardType(gridSize, _rowConfigs) {
                    this.gridSize = gridSize;
                    this._rowConfigs = _rowConfigs;
                }
                BoardType.prototype.createRows = function () {
                    var rows = new Array();
                    for (var i = 0; i < this._rowConfigs.length; i++) {
                        rows.push(this._rowConfigs[i].createRow(i + 1));
                    }
                    return rows;
                };
                return BoardType;
            })();
            Game.BoardType = BoardType;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardType.js.map
