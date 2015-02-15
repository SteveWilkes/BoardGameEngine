module AgileObjects.BoardGameEngine.Games {

    export var $gameEntityAnnotationMapper = "$gameEntityAnnotationMapper";

    angular
        .module(strategyGameApp)
        .service($gameEntityAnnotationMapper, [
            Pieces.Evaluation.$pieceEvaluatorMapper,
            GameEntityAnnotationMapper]);
}