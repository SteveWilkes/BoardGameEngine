module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceMovement {
        private _moveResult: boolean;

        constructor(private _origin: IPieceLocation, private _validDestinations: Array<IPieceLocation>) {
            this._setDestinationStates(true);
        }

        public complete(location: IPieceLocation): boolean {
            if (this._moveResult !== undefined) { return this._moveResult; }

            this._moveResult = false;

            if (location === this._origin) {
                this._moveResult = true;
            }
            else if (this._validDestinations.indexOf(location) > -1) {
                this._origin.movePieceTo(location);
                this._moveResult = true;
            }

            this._setDestinationStates(false);

            return this._moveResult;
        }

        private _setDestinationStates(isPotentialDestination: boolean): void {
            for (var i = 0; i < this._validDestinations.length; i++) {
                this._validDestinations[i].isPotentialDestination = isPotentialDestination;
            }
        }
    }
}