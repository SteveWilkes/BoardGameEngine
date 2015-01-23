module AgileObjects.StrategyGame.Games {

    export var $getGameTypeQuery = "$getGameTypeQuery";

    angular
        .module(strategyGameApp)
        .service($getGameTypeQuery, [Boards.$getBoardTypeQuery, GetGameTypeQuery]);
}