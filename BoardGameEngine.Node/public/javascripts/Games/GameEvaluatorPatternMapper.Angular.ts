module AgileObjects.BoardGameEngine.Games {

    export var $gameEvaluatorPatternMapper = "$gameEvaluatorPatternMapper";

    angular
        .module(strategyGameApp)
        .service($gameEvaluatorPatternMapper, [GameEvaluatorPatternMapper]);
}