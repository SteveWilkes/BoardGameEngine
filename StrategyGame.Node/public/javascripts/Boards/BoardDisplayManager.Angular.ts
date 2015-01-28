module AgileObjects.BoardGameEngine.Boards {

    export var $boardDisplayManager = "$boardDisplayManager";

    angular
        .module(strategyGameApp)
        .service($boardDisplayManager, ["$window", BoardDisplayManager]);
}