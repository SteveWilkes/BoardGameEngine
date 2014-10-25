module AgileObjects.StrategyGame.Game {

    export class Board {
        private _tilesByCoordinates: AgileObjects.TypeScript.IStringDictionary<BoardTile>;

        constructor(private _container: BoardContainer, private _sizeSet: BoardSizeSet) {
            this._createTiles();
            this.pieceMover = new PieceMover(this._tilesByCoordinates);
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            this._tilesByCoordinates = {};
            for (var row = 0; row < this._sizeSet.gridSize; row++) {
                for (var column = 0; column < this._sizeSet.gridSize; column++) {
                    var coordinates = coordinatesRegistry.get(row + 1, column + 1);
                    var tile = new BoardTile(coordinates);
                    this._tilesByCoordinates[coordinates.signature] = tile;
                    this.tiles.push(tile);
                }
            }

            this.tiles[0].assign(new Piece(
                "piece-1",
                "/Content/Pieces/Example.png",
                new AnyDirectionMovementProfile(2)));
        }

        public tiles: Array<BoardTile>;
        public pieceMover: PieceMover;
        public size: number;

        public resize(): void {
            this._sizeSet.recalculate(this._container.getSize());
            this.size = this._sizeSet.boardSize;
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].resize(this._sizeSet);
            }
        }
    }
}