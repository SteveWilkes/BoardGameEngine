module AgileObjects.StrategyGame.Teams {

    export var $teamFactory = "$teamFactory";

    angular
        .module(strategyGameApp)
        .service($teamFactory, [StrategyGame.Pieces.$pieceFactory, TeamFactory]);
}
