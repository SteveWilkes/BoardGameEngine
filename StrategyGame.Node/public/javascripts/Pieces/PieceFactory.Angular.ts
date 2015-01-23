module AgileObjects.StrategyGame.Pieces {

    export var $pieceFactory = "$pieceFactory";

    angular
        .module(strategyGameApp)
        .service($pieceFactory, PieceFactory);
}