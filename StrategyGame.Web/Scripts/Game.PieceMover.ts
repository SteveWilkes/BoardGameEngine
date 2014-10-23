module AgileObjects.StrategyGame.Game {

    export class PieceMover {
        private _currentPieceMovement: PieceMovement;

        // ReSharper disable InconsistentNaming
        constructor(private _tilesByCoordinates: ITilesByCoordinateSet) {
            // ReSharper restore InconsistentNaming
        }

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
        
        public pieceReset(): boolean {
            this._currentPieceMovement.cancel();
            return true;
        }

        public pieceMoved(destinationTile: BoardTile): boolean {
            return this._currentPieceMovement.complete(destinationTile);
        }
    }
}