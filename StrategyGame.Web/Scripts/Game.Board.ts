module AgileObjects.StrategyGame.Game {

    export class Board {
        private _tilesByCoordinates: ITilesByCoordinateSet;

        // ReSharper disable InconsistentNaming
        constructor(private _container: BoardContainer, private _settings: BoardSettings) {
            // ReSharper restore InconsistentNaming
            this._createTiles();
            this.pieceMover = new PieceMover(this._tilesByCoordinates);
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            this._tilesByCoordinates = {};
            for (var row = 0; row < this._settings.gridSize; row++) {
                for (var column = 0; column < this._settings.gridSize; column++) {
                    var coordinates = new Coordinates(row + 1, column + 1);
                    var tile = new BoardTile(coordinates);
                    this._tilesByCoordinates[coordinates.toString()] = tile;
                    this.tiles.push(tile);
                }
            }

            this.tiles[0].assign(new PieceBase(
                "piece-1",
                "/Content/Pieces/Example.png",
                new AnyDirectionMovementProfile(1)));
        }

        public tiles: Array<BoardTile>;
        public pieceMover: PieceMover;
        public size: number;

        public resize(): void {
            var containerSize = this._container.getSize();
            var resizeFactor = containerSize / defaultContainerSize;
            var tileSize = Math.floor(containerSize / this._settings.tileSizeFactor);
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].resize(tileSize, resizeFactor);
            }
            var tilesSize = tileSize * this._settings.gridSize;
            var tileBordersSize = this._settings.tileBorderWidth * 2 * this._settings.gridSize;
            this.size = tilesSize + tileBordersSize;
        }
    }
}