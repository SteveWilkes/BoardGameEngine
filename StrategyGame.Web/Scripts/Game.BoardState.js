var AgileObjects;
(function (AgileObjects) {
    (function (StrategyGame) {
        (function (Game) {
            var BoardState = (function () {
                // ReSharper disable InconsistentNaming
                function BoardState(_settings) {
                    this._settings = _settings;
                    // ReSharper restore InconsistentNaming
                    this._createTiles();
                }
                BoardState.prototype._createTiles = function () {
                    this.tiles = new Array();
                    this._tilesByCoordinates = {};
                    for (var row = 0; row < this._settings.gridSize; row++) {
                        for (var column = 0; column < this._settings.gridSize; column++) {
                            var coordinates = new Game.Coordinates(row + 1, column + 1);
                            var tile = new Game.BoardTile(coordinates);
                            this._tilesByCoordinates[coordinates.toString()] = tile;
                            this.tiles.push(tile);
                        }
                    }

                    this.tiles[0].assign(new Game.PieceBase("piece-1", "/Content/Pieces/Example.png", new Game.AnyDirectionMovementProfile(1)));
                };

                BoardState.prototype.pieceMoving = function (originTile) {
                    var possibleDestinations = originTile.piece.movementProfile.getPossibleDestinations(originTile.position);
                    var validDestinationTiles = new Array();
                    for (var i = 0; i < possibleDestinations.length; i++) {
                        var destinationTile = this._tilesByCoordinates[possibleDestinations[i].toString()];

                        // ReSharper disable once QualifiedExpressionMaybeNull
                        if (destinationTile !== undefined && !destinationTile.isOccupied()) {
                            validDestinationTiles.push(destinationTile);
                        }
                    }
                    this._currentPieceMovement = new Game.PieceMovement(originTile, validDestinationTiles);
                };

                BoardState.prototype.pieceMoved = function (destinationTile) {
                    return this._currentPieceMovement.complete(destinationTile);
                };
                return BoardState;
            })();
            Game.BoardState = BoardState;
        })(StrategyGame.Game || (StrategyGame.Game = {}));
        var Game = StrategyGame.Game;
    })(AgileObjects.StrategyGame || (AgileObjects.StrategyGame = {}));
    var StrategyGame = AgileObjects.StrategyGame;
})(AgileObjects || (AgileObjects = {}));
//# sourceMappingURL=C:/Data/VisualStudio/StrategyGame/StrategyGame.Web//Scripts/Game.BoardState.js.map
