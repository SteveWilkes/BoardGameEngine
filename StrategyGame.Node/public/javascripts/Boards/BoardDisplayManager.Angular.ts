module AgileObjects.StrategyGame.Game.Boards {

    export var $boardDisplayManager = "$boardDisplayManager";

    angular
        .module(strategyGameApp)
        .service($boardDisplayManager, ["$window", BoardDisplayManager]);
}