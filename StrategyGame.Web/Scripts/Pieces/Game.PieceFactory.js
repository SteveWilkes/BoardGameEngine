var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceFactory = (function () {
                function PieceFactory() {
                    this._definitions = {
                        "1": new Game.PieceDefinition("1", "Blah", "/Content/Pieces/Example.png", "1")
                    };
                }
                PieceFactory.prototype.createPiece = function (definitionId) {
                    return this._definitions[definitionId].createPiece("1");
                };
                return PieceFactory;
            })();
            Game.PieceFactory = PieceFactory;

            Game.game.service("$pieceFactory", PieceFactory);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceFactory.js.map
