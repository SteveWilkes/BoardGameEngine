var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceBase = (function () {
                function PieceBase(id, imageSource) {
                    this.id = id;
                    this.imageSource = imageSource;
                }
                PieceBase.prototype.resize = function (resizeFactor) {
                    this.width = Math.floor(Game.defaultPieceWidth * resizeFactor);
                    this.height = Math.floor(Game.defaultPieceHeight * resizeFactor);
                };
                return PieceBase;
            })();
            Game.PieceBase = PieceBase;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.PieceBase.js.map
