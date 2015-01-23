module AgileObjects.StrategyGame.Games {
    import Boards = StrategyGame.Boards;

    export var $gameFactory = "$gameFactory";

    angular
        .module(strategyGameApp)
        .service($gameFactory, [$getGameTypeQuery, GameFactory]);
} 