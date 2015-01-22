module AgileObjects.StrategyGame.Game {

    export var $getGameTypeQuery = "$getGameTypeQuery";

    angular
        .module(strategyGameApp)
        .service($getGameTypeQuery, [Boards.$getBoardTypeQuery, GetGameTypeQuery]);
}