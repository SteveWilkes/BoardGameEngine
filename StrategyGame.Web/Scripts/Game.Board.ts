module AgileObjects.StrategyGame.Game {

    export class Board {
        // ReSharper disable InconsistentNaming
        constructor(private _container: BoardContainer, private _config: BoardConfig) {
            // ReSharper restore InconsistentNaming
            this._createTiles();
            this.resize();
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < this._config.gridSize; row++) {
                for (var column = 0; column < this._config.gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }
        }

        public tiles: Array<BoardTile>;
        public size: number;

        public resize(): void {
            var containerSize = this._container.getSize();
            var tileSize = Math.floor(containerSize / this._config.tileSizeFactor);
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].size = tileSize;
            }
            var tilesSize = tileSize * this._config.gridSize;
            var tileBordersSize = this._config.tileBorderWidth * 2 * this._config.gridSize;
            this.size = tilesSize + tileBordersSize;
        }
    }
}