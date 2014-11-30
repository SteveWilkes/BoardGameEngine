var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var Board = (function () {
                function Board(type, events) {
                    this.type = type;
                    this._teams = new Array();

                    this._createTiles();
                    Game.PieceMover.create(this._tilesByCoordinates, events);
                }
                Board.prototype._createTiles = function () {
                    this.rows = this.type.createRows();
                    this._tilesByCoordinates = {};
                    for (var rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                        var row = this.rows[rowIndex];
                        for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                            var tile = row[columnIndex];
                            if (tile.position !== undefined) {
                                this._tilesByCoordinates[tile.position.signature] = tile;
                            }
                        }
                    }
                };

                Board.prototype.add = function (team, position) {
                    var startingFormation = team.getStartingFormation();
                    for (var i = 0; i < startingFormation.tileConfigs.length; i++) {
                        var tileConfig = startingFormation.tileConfigs[i];
                        var translatedCoordinates = position.translate(tileConfig.tileCoordinates, this.type.gridSize);
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
