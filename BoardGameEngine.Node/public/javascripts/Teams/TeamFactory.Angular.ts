module AgileObjects.BoardGameEngine.Teams {

    export var $teamFactory = "$teamFactory";

    angular
        .module(strategyGameApp)
        .service($teamFactory, TeamFactory);
}
