module AgileObjects.StrategyGame.Game {

    export class PieceMover {
        private _currentPieceMovement: PieceMovement;

        constructor(private _tilesByCoordinates: AgileObjects.TypeScript.IStringDictionary<BoardTile>) {
        }

        public pieceSelected(originTile: BoardTile) {
            var possibleDestinations = originTile.piece.movementProfile.getPossibleDestinations(originTile.position);
            var validDestinationTiles = new Array<BoardTile>();
            for (var i = 0; i < possibleDestinations.length; i++) {
                var destinationTile = this._tilesByCoordinates[possibleDestinations[i].signature];
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

        public pieceDeselected(): boolean {
            this._currentPieceMovement.cancel();
            return true;
        }
    }
}