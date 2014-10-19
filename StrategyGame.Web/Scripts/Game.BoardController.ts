module AgileObjects.StrategyGame.Game {

    game.controller("BoardController", ["$boardLayoutManager", "$boardManager", "$scope",
        ($layoutManager: IBoardLayoutManager, $boardManager: IBoardManager, $scope: any) => {
            $scope.board = $boardManager.board;
        }
    ]);
}