﻿var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                // ReSharper disable InconsistentNaming
                function Board(_container, _config) {
                    this._container = _container;
                    this._config = _config;
                    // ReSharper restore InconsistentNaming
                    this._createTiles();
                    this.resize();
                }
                Board.prototype._createTiles = function () {
                    this.tiles = new Array();
                    for (var row = 0; row < this._config.settings.gridSize; row++) {
                        for (var column = 0; column < this._config.settings.gridSize; column++) {
                            this.tiles.push(new Game.BoardTile(row + 1, column + 1));
                        }
                    }
                };

                Board.prototype.resize = function () {
                    var containerSize = this._container.getSize();
                    var tileSize = Math.floor(containerSize / this._config.settings.tileSizeFactor);
                    for (var i = 0; i < this.tiles.length; i++) {
                        this.tiles[i].size = tileSize;
                    }
                    var tilesSize = tileSize * this._config.settings.gridSize;
                    var tileBordersSize = this._config.settings.tileBorderWidth * 2 * this._config.settings.gridSize;
                    this.size = tilesSize + tileBordersSize;
                };
                return Board;
            })();
            Game.Board = Board;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.Board.js.map
