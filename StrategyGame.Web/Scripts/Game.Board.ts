module AgileObjects.StrategyGame.Game {

    var tileSizeFactor = 14;

    export class Board {
        private _gridSize: number;
        private _tileBorderWidth: number;

        constructor($config: BoardConfig) {
            this._gridSize = $config.gridSize;
            this._tileBorderWidth = $config.tileBorderWidth;

            this._createTiles();
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < this._gridSize; row++) {
                for (var column = 0; column < this._gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }
        }

        public tiles: Array<BoardTile>;
        public size: number;

        public sizeTo(container: IBoardContainer): void {
            var containerSize = container.getSize();
            var tileSize = Math.floor(containerSize / tileSizeFactor);
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].size = tileSize;
            }
            var tilesSize = tileSize * this._gridSize;
            var tileBordersSize = this._tileBorderWidth * 2 * this._gridSize;
            this.size = tilesSize + tileBordersSize;
        }
    }

    game.service("$board", ["$boardConfig", Board]);
}