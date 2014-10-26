var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var GameController = (function () {
                function GameController($gameFactory, $scope) {
                    $scope.game = $gameFactory.createNewGame(8);
                }
                return GameController;
            })();

            angular.module(Game.strategyGameApp).controller("GameController", [Game.gameFactory, "$scope", GameController]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.GameController.js.map
