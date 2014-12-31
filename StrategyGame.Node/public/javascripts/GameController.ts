module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;

    class GameController {
        constructor(windowService, gameFactory: IGameFactory, scope: IGameScope) {
            var displayDataService = new Boards.BoardDisplayDataService(windowService);
            var displayManager = new Boards.BoardDisplayManager(displayDataService);

            scope.globalEvents = GlobalEventSet.instance;
            scope.game = gameFactory.createNewGame(displayManager, "1", 2);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", ["$window", $gameFactory, "$scope", GameController]);
}