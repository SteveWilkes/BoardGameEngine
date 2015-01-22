module AgileObjects.StrategyGame.Game.Pieces {

    export var $pieceFactory = "$pieceFactory";

    angular
        .module(strategyGameApp)
        .service($pieceFactory, PieceFactory);
}