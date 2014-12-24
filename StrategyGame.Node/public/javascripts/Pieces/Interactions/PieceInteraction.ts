module AgileObjects.StrategyGame.Game.Pieces {

    enum InteractionState { On, Off }

    export class PieceInteraction {
        private _origin: IPieceLocation;
        private _movementDestinations: Array<IPieceLocation>;
        private _attackTargets: TypeScript.Dictionary<PieceAttack, Array<IPieceLocation>>;
        private _moveResult: boolean;
        private _currentMovementState: InteractionState;
        private _currentAttackState: InteractionState;

        constructor(piece: Piece, private _currentTeam: IPieceOwner) {
            this._origin = piece.location;
            this._movementDestinations = piece.movementProfile.getDestinations(piece.location);
            this._attackTargets = piece.attackProfile.getTargetsByAttack(piece.location);

            this._setLocationStates(InteractionState.On, InteractionState.On);
        }

        public handlePieceMovement(): void {
            // The Piece is moving, so no need to keep highlighting attack locations:
            this._setLocationStates(InteractionState.On, InteractionState.Off);
        }

        public complete(location: IPieceLocation): boolean {
            if (this._moveResult !== undefined) { return this._moveResult; }

            this._moveResult = false;

            if (this._origin.contains(location)) {
                var attackState;
                if (this._attackTargets.count > 0) {
                    attackState = !this._currentTeam.owns(this._origin.piece) || this._origin.isSelected()
                    ? InteractionState.Off : InteractionState.On;
                    this._origin.isSelected(attackState === InteractionState.On);
                } else {
                    attackState = InteractionState.Off;
                }
                this._setLocationStates(InteractionState.Off, attackState);
                this._moveResult = true;
            }
            else if (this._movementDestinations.indexOf(location) > -1) {
                this._origin.movePieceTo(location);
                this._setLocationStates(InteractionState.Off, InteractionState.Off);
                this._moveResult = true;
            }

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
                for (i = 0; i < this._attackTargets.count; i++) {
                    var attack = this._attackTargets.keys[i];
                    var attackLocations = this._attackTargets.values[i];
                    for (var j = 0; j < attackLocations.length; j++) {
                        attackLocations[j].potentialAttack = (attackState === InteractionState.On) ? attack : undefined;
                    }
                }
                this._currentAttackState = attackState;
            }
        }
    }
}