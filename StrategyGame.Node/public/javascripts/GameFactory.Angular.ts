module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;

    export var $gameFactory = "$gameFactory";

    angular
        .module(strategyGameApp)
        .service($gameFactory, [$getGameTypeQuery, GameFactory]);
} 