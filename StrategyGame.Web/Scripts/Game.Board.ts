module AgileObjects.StrategyGame.Game {

    export class Board {
        // ReSharper disable InconsistentNaming
        constructor(private _container: BoardContainer, public config: BoardConfig) {
            // ReSharper restore InconsistentNaming
            this._createTiles();
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < this.config.settings.gridSize; row++) {
                for (var column = 0; column < this.config.settings.gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }

            this.tiles[0].assign(new PieceBase("piece-1", "/Content/Pieces/Example.png"));
        }

        public tiles: Array<BoardTile>;
        public size: number;

        public resize(): void {
            var containerSize = this._container.getSize();
            var resizeFactor = containerSize / defaultContainerSize;
            var tileSize = Math.floor(containerSize / this.config.settings.tileSizeFactor);
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].resize(tileSize, resizeFactor);
            }
            var tilesSize = tileSize * this.config.settings.gridSize;
            var tileBordersSize = this.config.settings.tileBorderWidth * 2 * this.config.settings.gridSize;
            this.size = tilesSize + tileBordersSize;
        }
    }
}