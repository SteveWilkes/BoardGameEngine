﻿module AgileObjects.BoardGameEngine.Boards {
    import Ts = TypeScript;

    export var $getBoardTypeQuery = "$getBoardTypeQuery";

    angular
        .module(strategyGameApp)
        .service($getBoardTypeQuery, [GetBoardTypeQuery]);
}