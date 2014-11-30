module AgileObjects.StrategyGame.Game {

    class GameController {
        constructor($gameFactory: IGameFactory, $scope: IGameScope) {
            $scope.game = $gameFactory.createNewGame(boardTypeRegistry.diamond);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [gameFactory, "$scope", GameController]);
}