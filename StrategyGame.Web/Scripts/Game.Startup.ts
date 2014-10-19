module AgileObjects.StrategyGame.Game.Startup {

    var tileSizeFactor = 14;
    var strategyGameApp = angular.module('strategyGameApp', []);

    strategyGameApp.controller("BoardController", ($scope: ng.IScope) => {
        var tiles = new Array<Object>();
        for (var row = 1; row < 9; row++) {
            for (var column = 1; column < 9; column++) {
                var isEvenRow = (row - 1) % 2 === 0;
                var isEvenColumn = (column - 1) % 2 === 0;
                var isDarkTile = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);
                tiles.push({ row: row, column: column, isDark: isDarkTile });
            }
        }
        $scope["tiles"] = tiles;
    });

    class BoardLayoutManager {
        constructor() {
            $(window).resize(() => this._resizeTiles());
            this._resizeTiles();
            this._$getBoard().removeClass("hidden");
        }

        private _resizeTiles(): void {
            var currentHeight = $(window).height();
            var tileSize = Math.floor(currentHeight / tileSizeFactor);
            $("div.board-tile").width(tileSize).height(tileSize);
            var boardWidth = (tileSize * 8) + (4 * 8);
            this._$getBoard().width(boardWidth);
        }

        private _$getBoard(): JQuery {
            return $("#board");
        }
    }

    $(() => new BoardLayoutManager());
}