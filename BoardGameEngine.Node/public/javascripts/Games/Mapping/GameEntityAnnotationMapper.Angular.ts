﻿module AgileObjects.BoardGameEngine.Games {

    export var $gameEntityAnnotationMapper = "$gameEntityAnnotationMapper";

    angular
        .module(strategyGameApp)
        .service($gameEntityAnnotationMapper, [$gameEvaluatorPatternMapper, GameEntityAnnotationMapper]);
}