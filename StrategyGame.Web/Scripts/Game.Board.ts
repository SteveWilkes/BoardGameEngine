module AgileObjects.StrategyGame.Game {

    export class Board {

        // ReSharper disable InconsistentNaming
        constructor(private _container: BoardContainer, private _settings: BoardSettings) {
            // ReSharper restore InconsistentNaming
            this.state = new BoardState(this._settings);
            this.tiles = this.state.tiles;
        }

        public state: BoardState;
        public tiles: Array<BoardTile>;
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