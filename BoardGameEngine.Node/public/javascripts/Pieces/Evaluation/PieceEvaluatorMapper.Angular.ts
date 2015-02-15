module AgileObjects.BoardGameEngine.Pieces.Evaluation {
    
    export var $pieceEvaluatorMapper = "$pieceEvaluatorMapper";

    angular
        .module(strategyGameApp)
        .service($pieceEvaluatorMapper, [PieceEvaluatorMapper]);
}