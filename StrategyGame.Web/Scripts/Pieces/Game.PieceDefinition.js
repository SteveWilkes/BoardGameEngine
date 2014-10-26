var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var PieceDefinition = (function () {
                function PieceDefinition(id, name, imageSource, _movementProfile) {
                    this.id = id;
                    this.name = name;
                    this.imageSource = imageSource;
                    this._movementProfile = _movementProfile;
                }
                PieceDefinition.prototype.createPiece = function (pieceId) {
                    return new Game.Piece(pieceId, this.imageSource, this._movementProfile);
                };
                return PieceDefinition;
            })();
            Game.PieceDefinition = PieceDefinition;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Pieces/Game.PieceDefinition.js.map
