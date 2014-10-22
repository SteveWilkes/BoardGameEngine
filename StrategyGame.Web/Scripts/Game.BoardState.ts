module AgileObjects.StrategyGame.Game {

    interface ITilesByCoordinateSet {
        [coordinates: string]: BoardTile;
    }

    export class BoardState {
        private _currentPieceMovement: PieceMovement;
        private _tilesByCoordinates: ITilesByCoordinateSet;

        // ReSharper disable InconsistentNaming
        constructor(private _settings: BoardSettings) {
            // ReSharper restore InconsistentNaming
            this._createTiles();
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

        public pieceMoving(originTile: BoardTile): void {
            var possibleDestinations = originTile.piece.movementProfile.getPossibleDestinations(originTile.position);
            var validDestinationTiles = new Array<BoardTile>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                var destinationTile = this._tilesByCoordinates[possibleDestinations[i].toString()];
                // ReSharper disable once QualifiedExpressionMaybeNull
                if (destinationTile !== undefined && !destinationTile.isOccupied()) {
                    validDestinationTiles.push(destinationTile);
                }
            }
            this._currentPieceMovement = new PieceMovement(originTile, validDestinationTiles);
        }

        public pieceMoved(destinationTile: BoardTile): boolean {
            return this._currentPieceMovement.complete(destinationTile);
        }
    }
}