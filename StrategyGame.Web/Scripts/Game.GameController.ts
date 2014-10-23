module AgileObjects.StrategyGame.Game {

    game.controller("GameController", ["$window", "$scope",
        ($window: ng.IWindowService, $scope: IGameScope) => {
            var container = new BoardContainer($window);
            var settings = new BoardSettings(8, 2);
            var board = new Board(container, settings);
            $scope.game = new Game(board);
        }
    ]);
}