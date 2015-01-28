module AgileObjects.BoardGameEngine.Games {

    export var $gameService = "$gameService";

    angular
        .module(strategyGameApp)
        .service($gameService, [
            Angular.Services.$idGenerator,
            $gameFactory,
            Teams.$teamFactory,
            GameService]);
}