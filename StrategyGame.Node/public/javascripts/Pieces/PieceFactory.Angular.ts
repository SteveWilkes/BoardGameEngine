module AgileObjects.BoardGameEngine.Pieces {

    export var $pieceFactory = "$pieceFactory";

    angular
        .module(strategyGameApp)
        .service($pieceFactory, PieceFactory);
}