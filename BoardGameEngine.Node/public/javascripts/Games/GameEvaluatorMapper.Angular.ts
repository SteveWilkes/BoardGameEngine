module AgileObjects.BoardGameEngine.Games {

    export var $gameEvaluatorMapper = "$gameEvaluatorMapper";

    angular
        .module(strategyGameApp)
        .service($gameEvaluatorMapper, [GameEvaluatorMapper]);
}