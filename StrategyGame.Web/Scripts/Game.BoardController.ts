module AgileObjects.StrategyGame.Game {

    game.controller("BoardController", ["$window", "$scope",
        ($window: ng.IWindowService, $scope: IGameScope) => {
            var container = new BoardContainer($window);
            var settings = new BoardSettings(8, 2);
            var state = new BoardState();
            var config = new BoardConfig(settings, state);
            $scope.board = new Board(container, config);
        }
    ]);
}