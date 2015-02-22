module AgileObjects.BoardGameEngine.Games {

    export var $gameTypeMapper = "$gameTypeMapper";

    angular
        .module(strategyGameApp)
        .service($gameTypeMapper, [
            Boards.$getBoardTypeQuery,
            $gameEntityAnnotationMapper,
            $gameEvaluatorPatternMapper,
            GameTypeMapper]);
}