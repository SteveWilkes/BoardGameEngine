var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                function Board(gridSize, eventSet) {
                    this.gridSize = gridSize;
                    this._createTiles();
                    this._pieceMover = new Game.PieceMover(this._tilesByCoordinates, eventSet);
                    this._teams = new Array();
                }
                Board.prototype._createTiles = function () {
                    this.tiles = new Array();
                    this._tilesByCoordinates = {};
                    for (var row = 0; row < this.gridSize; row++) {
                        for (var column = 0; column < this.gridSize; column++) {
                            var coordinates = Game.coordinatesRegistry.get(row + 1, column + 1);
                            var tile = new Game.BoardTile(coordinates);
                            this._tilesByCoordinates[coordinates.signature] = tile;
                            this.tiles.push(tile);
                        }
                    }
                };

                Board.prototype.add = function (team, position) {
                    var startingFormation = team.getStartingFormation();
                    for (var i = 0; i < startingFormation.tileConfigs.length; i++) {
                        var tileConfig = startingFormation.tileConfigs[i];
                        var translatedCoordinates = position.translate(tileConfig.tileCoordinates, this.gridSize);
                        var tile = this._tilesByCoordinates[translatedCoordinates.signature];
                        tile.add(tileConfig.piece);
                    }
                };
                return Board;
            })();
            Game.Board = Board;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Boards/Game.Board.js.map
