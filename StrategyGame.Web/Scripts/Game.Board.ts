module AgileObjects.StrategyGame.Game {

    export class Board {
        // ReSharper disable InconsistentNaming
        constructor(private _container: BoardContainer, public config: BoardConfig) {
            // ReSharper restore InconsistentNaming
            this._createTiles();
            this.resize();
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < this.config.settings.gridSize; row++) {
                for (var column = 0; column < this.config.settings.gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }

            this.tiles[0].piece = <IPiece>{
                imageSource: "/Content/Pieces/Example.png",
                width: defaultPieceWidth,
                height: defaultPieceHeight,
                resize: function (resizeFactor: number) {
                    this.width = Math.floor(defaultPieceWidth * resizeFactor);
                    this.height = Math.floor(defaultPieceHeight * resizeFactor);
                }
            };
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