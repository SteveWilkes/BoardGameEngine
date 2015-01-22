module AgileObjects.StrategyGame.Game.Teams {

    export var $teamFactory = "$teamFactory";

    angular
        .module(strategyGameApp)
        .service($teamFactory, [StrategyGame.Game.Pieces.$pieceFactory, TeamFactory]);
}
