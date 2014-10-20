var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.game.controller("BoardController", [
                "$window", "$scope",
                function ($window, $scope) {
                    var container = new Game.BoardContainer($window);
                    var settings = new Game.BoardSettings(8, 2);
                    var state = new Game.BoardState();
                    var config = new Game.BoardConfig(settings, state);
                    $scope.board = new Game.Board(container, config);
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardController.js.map
