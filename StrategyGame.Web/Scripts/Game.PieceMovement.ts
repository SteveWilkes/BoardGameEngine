module AgileObjects.StrategyGame.Game {

    export class PieceMovement {
        // ReSharper disable InconsistentNaming
        constructor(private _originTile: BoardTile, private _validDestinationTiles: Array<BoardTile>) {
            // ReSharper restore InconsistentNaming
        }

        public complete(destinationTile: BoardTile): boolean {
            if (destinationTile === this._originTile) { return true; }
            if (this._validDestinationTiles.indexOf(destinationTile) === -1) { return false; }

            this._originTile.pieceMovedTo(destinationTile);
            return true;
        }
    }
}