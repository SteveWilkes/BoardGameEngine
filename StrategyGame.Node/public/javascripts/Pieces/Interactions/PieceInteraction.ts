module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceInteraction {
        private _moveResult: boolean;

        constructor(
            private _origin: IPieceLocation,
            private _movementDestinations: Array<IPieceLocation>,
            private _attackTargets: TypeScript.Dictionary<PieceAttack, Array<IPieceLocation>>) {
            this._setLocationStates(true);
        }

        public completeMovement(destination: IPieceLocation): boolean {
            if (this._moveResult !== undefined) { return this._moveResult; }

            this._moveResult = false;

            if (destination === this._origin) {
                this._moveResult = true;
            }
            else if (this._movementDestinations.indexOf(destination) > -1) {
                this._origin.movePieceTo(destination);
                this._moveResult = true;
            }

            this._setLocationStates(false);

            return this._moveResult;
        }

        private _setLocationStates(switchOn: boolean): void {
            var i;
            for (i = 0; i < this._movementDestinations.length; i++) {
                this._movementDestinations[i].isPotentialDestination = switchOn;
            }
            for (i = 0; i < this._attackTargets.keys.length; i++) {
                var attack = this._attackTargets.keys[i];
                var attackLocations = this._attackTargets.get(attack);
                for (var j = 0; j < attackLocations.length; j++) {
                    attackLocations[j].potentialAttack = switchOn ? attack : null;
                }
            }
        }
    }
}