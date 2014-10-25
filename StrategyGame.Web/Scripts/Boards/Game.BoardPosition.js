var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardPosition = (function () {
                function BoardPosition(_coordinateTranslator) {
                    this._coordinateTranslator = _coordinateTranslator;
                }
                BoardPosition.prototype.translate = function (coordinates, gridSize) {
                    return this._coordinateTranslator(coordinates, gridSize);
                };
                return BoardPosition;
            })();
            Game.BoardPosition = BoardPosition;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.BoardPosition.js.map
