module AgileObjects.StrategyGame.Boards {

    export var $boardDisplayManager = "$boardDisplayManager";

    angular
        .module(strategyGameApp)
        .service($boardDisplayManager, ["$window", BoardDisplayManager]);
}