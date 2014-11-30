var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var placeholderTile = {};

            var BoardRowConfig = (function () {
                function BoardRowConfig(_tileConfigs) {
                    this._tileConfigs = _tileConfigs;
                }
                BoardRowConfig.prototype.createRow = function (rowNumber) {
                    var row = new Array();
                    for (var columnNumber = 1; columnNumber < this._tileConfigs.length + 1; ++columnNumber) {
                        if (!this._tileConfigs[columnNumber - 1]) {
                            row.push(placeholderTile);
                            continue;
                        }
                        var coordinates = Game.coordinatesRegistry.get(rowNumber, columnNumber);
                        var tile = new Game.BoardTile(coordinates);
                        row.push(tile);
                    }
                    return row;
                };
                return BoardRowConfig;
            })();
            Game.BoardRowConfig = BoardRowConfig;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardRowConfig.js.map
