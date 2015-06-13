module AgileObjects.BoardGameEngine.Games {

    export var $getGameTypeQuery = "$getGameTypeQuery";

    angular
        .module(strategyGameApp)
        .service($getGameTypeQuery, [$gameTypeMapper, GetGameTypeQuery]);
}