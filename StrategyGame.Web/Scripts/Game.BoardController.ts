module AgileObjects.StrategyGame.Game {

    game.controller("BoardController", ["$boardContainer", "$board", "$scope",
        (container: IBoardContainer, board: Board, $scope: IGameScope) => {
            $scope.container = container;
            $scope.board = board;

            $scope.board.sizeTo($scope.container);
        }
    ]);
}