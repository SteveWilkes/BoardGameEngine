module AgileObjects.StrategyGame.Game {

    class GameController {
        constructor($gameFactory: IGameFactory, $scope: IGameScope) {
            $scope.game = $gameFactory.createNewGame(8);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [gameFactory, "$scope", GameController]);
}