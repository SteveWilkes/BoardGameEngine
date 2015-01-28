module AgileObjects.BoardGameEngine.Games {
    import Boards = BoardGameEngine.Boards;

    export var $gameFactory = "$gameFactory";

    angular
        .module(strategyGameApp)
        .service($gameFactory, [$getGameTypeQuery, GameFactory]);
} 