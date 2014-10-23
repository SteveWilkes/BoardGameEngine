module AgileObjects.StrategyGame.Game {

    export class PieceMovement {
        // ReSharper disable InconsistentNaming
        constructor(private _originTile: BoardTile, private _validDestinationTiles: Array<BoardTile>) {
            // ReSharper restore InconsistentNaming
            this._setDestinationTileStates(true);
        }

        public complete(destinationTile: BoardTile): boolean {
            if (destinationTile === this._originTile) { return true; }
            if (this._validDestinationTiles.indexOf(destinationTile) === -1) { return false; }

            this._originTile.pieceMovedTo(destinationTile);
            this._setDestinationTileStates(false);

            return true;
        }

        private _setDestinationTileStates(isPotentialDestination: boolean): void {
            for (var i = 0; i < this._validDestinationTiles.length; i++) {
                this._validDestinationTiles[i].isPotentialDestination = isPotentialDestination;
            }
        }
    }
}