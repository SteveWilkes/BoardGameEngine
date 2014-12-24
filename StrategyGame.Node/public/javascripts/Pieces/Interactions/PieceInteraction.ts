module AgileObjects.StrategyGame.Game.Pieces {

    enum InteractionState {
        On,
        Off
    }

    export class PieceInteraction {
        private _origin: IPieceLocation;
        private _movementDestinations: Array<IPieceLocation>;
        private _attackTargets: TypeScript.Dictionary<PieceAttack, Array<IPieceLocation>>;
        private _moveResult: boolean;
        private _currentMovementState: InteractionState;
        private _currentAttackState: InteractionState;

        constructor(piece: Piece) {
            this._origin = piece.location;
            this._movementDestinations = piece.movementProfile.getDestinations(piece.location);
            this._attackTargets = piece.attackProfile.getTargetsByAttack(piece.location);

            this._setLocationStates(InteractionState.On, InteractionState.On);
        }

        public handlePieceMovement(): void {
            // The Piece is moving, so we know it's not going to be an attack:
            this._setLocationStates(InteractionState.On, InteractionState.Off);
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

            this._setLocationStates(InteractionState.Off, InteractionState.Off);

            return this._moveResult;
        }

        private _setLocationStates(movementState: InteractionState, attackState: InteractionState): void {
            var i;
            if (this._currentMovementState !== movementState) {
                for (i = 0; i < this._movementDestinations.length; i++) {
                    this._movementDestinations[i].setPotentialDestination(movementState === InteractionState.On);
                }
                this._currentMovementState = movementState;
            }

            if (this._currentAttackState !== attackState) {
                for (i = 0; i < this._attackTargets.keys.length; i++) {
                    var attack = this._attackTargets.keys[i];
                    var attackLocations = this._attackTargets.values[i];
                    for (var j = 0; j < attackLocations.length; j++) {
                        attackLocations[j].potentialAttack = (attackState === InteractionState.On) ? attack : null;
                    }
                }
                this._currentAttackState = attackState;
            }
        }
    }
}