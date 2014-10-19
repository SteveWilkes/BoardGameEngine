var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            (function (Startup) {
                var tileSizeFactor = 14;
                var strategyGameApp = angular.module('strategyGameApp', []);

                strategyGameApp.controller("BoardController", function ($scope) {
                    var tiles = new Array();
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

                var BoardLayoutManager = (function () {
                    function BoardLayoutManager() {
                        var _this = this;
                        $(window).resize(function () {
                            return _this._resizeTiles();
                        });
                        this._resizeTiles();
                        this._$getBoard().removeClass("hidden");
                    }
                    BoardLayoutManager.prototype._resizeTiles = function () {
                        var currentHeight = $(window).height();
                        var tileSize = Math.floor(currentHeight / tileSizeFactor);
                        $("div.board-tile").width(tileSize).height(tileSize);
                        var boardWidth = (tileSize * 8) + (4 * 8);
                        this._$getBoard().width(boardWidth);
                    };

                    BoardLayoutManager.prototype._$getBoard = function () {
                        return $("#board");
                    };
                    return BoardLayoutManager;
                })();

                $(function () {
                    return new BoardLayoutManager();
                });
            })(Game.Startup || (Game.Startup = {}));
            var Startup = Game.Startup;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Startup.js.map
