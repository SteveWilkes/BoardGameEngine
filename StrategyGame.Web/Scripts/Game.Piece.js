var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Piece = (function () {
                function Piece(id, imageSource, movementProfile) {
                    this.id = id;
                    this.imageSource = imageSource;
                    this.movementProfile = movementProfile;
                }
                Piece.prototype.resize = function (resizeFactor) {
                    this.width = Math.floor(Game.defaultPieceWidth * resizeFactor);
                    this.height = Math.floor(Game.defaultPieceHeight * resizeFactor);
                };

                Piece.prototype.moving = function () {
                    console.log("Piece " + this.id + " moving");
                };

                Piece.prototype.moved = function () {
                    console.log("Piece " + this.id + " moved");
                };
                return Piece;
            })();
            Game.Piece = Piece;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Piece.js.map
