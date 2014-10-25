module AgileObjects.StrategyGame.Game {

    game.controller("GameController", ["$window", "$scope",
        ($window: ng.IWindowService, $scope: IGameScope) => {
            var container = new BoardContainer($window);
            var boardSizeDefaults = new BoardSizeDefaults(975, 50, 80, 2);
            var boardSizeSet = new BoardSizeSet(boardSizeDefaults, 8);
            var board = new Board(container, boardSizeSet);
            $scope.game = new Game(board);
        }
    ]);
}