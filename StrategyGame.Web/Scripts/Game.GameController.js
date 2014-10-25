var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            Game.game.controller("GameController", [
                "$window", "$scope",
                function ($window, $scope) {
                    var container = new Game.BoardContainer($window);
                    var boardSizeDefaults = new Game.BoardSizeDefaults(975, 50, 80, 2);
                    var boardSizeSet = new Game.BoardSizeSet(boardSizeDefaults, 8);
                    var board = new Game.Board(container, boardSizeSet);
                    $scope.game = new Game.Game(board);
                }
            ]);
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.GameController.js.map
