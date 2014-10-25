module AgileObjects.StrategyGame.Game {

    export class PieceMovement {
        private _moveResult: boolean;

        constructor(private _originTile: BoardTile, private _validDestinationTiles: Array<BoardTile>) {
            this._setDestinationTileStates(true);
        }

        public cancel(): void {
            this._setDestinationTileStates(false);
        }

        public complete(destinationTile: BoardTile): boolean {
            if (this._moveResult !== undefined) { return this._moveResult; }

            this._moveResult = false;

            if (destinationTile === this._originTile) {
                this._moveResult = true;
            }
            else if (this._validDestinationTiles.indexOf(destinationTile) > -1) {
                this._originTile.movePieceTo(destinationTile);
                this._moveResult = true;
            }

            this._setDestinationTileStates(false);

            return this._moveResult;
        }

        private _setDestinationTileStates(isPotentialDestination: boolean): void {
            for (var i = 0; i < this._validDestinationTiles.length; i++) {
                this._validDestinationTiles[i].isPotentialDestination = isPotentialDestination;
            }
        }
    }
}