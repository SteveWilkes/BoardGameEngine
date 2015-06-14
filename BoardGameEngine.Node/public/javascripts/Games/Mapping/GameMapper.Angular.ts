module AgileObjects.BoardGameEngine.Games {

    export var $gameMapper = "$gameMapper";

    angular
        .module(strategyGameApp)
        .service($gameMapper, [Games.$gameFactory, AgileObjects.BoardGameEngine.Teams.$teamFactory, GameMapper]);
}