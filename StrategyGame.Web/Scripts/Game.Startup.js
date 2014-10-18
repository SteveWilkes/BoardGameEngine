var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            (function (Startup) {
                var tileNumber = 14;

                var BoardLayoutManager = (function () {
                    function BoardLayoutManager() {
                    }
                    BoardLayoutManager.prototype.setupBoard = function () {
                        var _this = this;
                        $(window).resize(function () {
                            return _this._layoutTiles();
                        });
                        this._layoutTiles();
                        $("#board").removeClass("hidden");
                    };

                    BoardLayoutManager.prototype._layoutTiles = function (attemptNumber) {
                        if (typeof attemptNumber === "undefined") { attemptNumber = 1; }
                        var currentHeight = $(window).height();
                        var tileSize = Math.floor(currentHeight / tileNumber);
                        $("div.board-tile").width(tileSize).height(tileSize);
                    };
                    return BoardLayoutManager;
                })();

                var layoutManager = new BoardLayoutManager();

                $(function () {
                    return layoutManager.setupBoard();
                });
            })(Game.Startup || (Game.Startup = {}));
            var Startup = Game.Startup;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Startup.js.map
