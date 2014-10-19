module AgileObjects.StrategyGame.Game {

    game.controller("BoardController", ["$boardLayoutManager", "$boardManager", "$scope",
        ($layoutManager: IBoardLayoutManager, $boardManager: IBoardManager, $scope: IGameScope) => {
            $scope.board = $boardManager.board;
            $scope.windowResizeListeners = [$layoutManager];
        }
    ]);
}