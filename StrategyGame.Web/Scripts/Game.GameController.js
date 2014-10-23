var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.game.controller("GameController", [
                "$window", "$scope",
                function ($window, $scope) {
                    var container = new Game.BoardContainer($window);
                    var settings = new Game.BoardSettings(8, 2);
                    var board = new Game.Board(container, settings);
                    $scope.game = new Game.Game(board);
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.GameController.js.map
