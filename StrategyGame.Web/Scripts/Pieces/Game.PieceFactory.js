var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.pieceFactory = "$pieceFactory";

            var PieceFactory = (function () {
                function PieceFactory() {
                    this._definitions = {
                        "1": new Game.PieceDefinition("1", "Bomb", "/Content/Pieces/Bomb.png", new Game.AnyDirectionMovementProfile(1, [new Game.OnlyValidLocationsPieceMovementFilter(), new Game.OnlyOccupiedLocationsPieceMovementFilter()])),
                        "2": new Game.PieceDefinition("2", "Example", "/Content/Pieces/Example.png", new Game.AnyDirectionMovementProfile(1, [new Game.OnlyValidLocationsPieceMovementFilter(), new Game.OnlyEmptyLocationsPieceMovementFilter()]))
                    };
                    this._nextPieceId = 1;
                }
                PieceFactory.prototype.createPiece = function (definitionId) {
                    var pieceId = this._nextPieceId++;
                    return this._definitions[definitionId].createPiece("piece-" + pieceId);
                };
                return PieceFactory;
            })();

            angular.module(Game.strategyGameApp).service(Game.pieceFactory, PieceFactory);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceFactory.js.map
