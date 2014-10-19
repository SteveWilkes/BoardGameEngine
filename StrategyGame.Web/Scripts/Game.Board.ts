module AgileObjects.StrategyGame.Game {

    var tileSizeFactor = 14;

    export class Board {
        // ReSharper disable InconsistentNaming
        constructor(private _gridSize: number, private _tileBorderWidth: number) {
            // ReSharper restore InconsistentNaming
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < this._gridSize; row++) {
                for (var column = 0; column < this._gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }
        }

        public tiles: Array<BoardTile>;
        public size: number;

        public resizeTo(containerSize: number): void {
            var tileSize = Math.floor(containerSize / tileSizeFactor);
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].size = tileSize;
            }
            var tilesSize = tileSize * this._gridSize;
            var tileBordersSize = this._tileBorderWidth * 2 * this._gridSize;
            this.size = tilesSize + tileBordersSize;
        }
    }
}