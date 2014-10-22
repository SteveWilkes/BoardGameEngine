module AgileObjects.StrategyGame.Game {

    export class BoardState {
        // ReSharper disable InconsistentNaming
        constructor(private _settings: BoardSettings) {
            // ReSharper restore InconsistentNaming
            this._createTiles();
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < this._settings.gridSize; row++) {
                for (var column = 0; column < this._settings.gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }

            this.tiles[0].assign(new PieceBase("piece-1", "/Content/Pieces/Example.png"));
        }

        public tiles: Array<BoardTile>;

        public pieceMoving(originTile: BoardTile): void {

        }

        public pieceMoved(detinationTile: BoardTile): boolean {
            return true;
        }
    }
}