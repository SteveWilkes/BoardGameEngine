module AgileObjects.BoardGameEngine.Status {

    export class TurnRegulator implements P.IPieceInteractionRegulator {
        private _currentTurnInteractionTypes: Array<P.InteractionType>;

        constructor(private _turnDefinition: P.TurnDefinition, private _game: G.Game) {
            this._game.events.turnStarted.subscribe(team => this._turnStarted(team) === void (0));

            this._game.events.pieceMoved.subscribe((movement, eventData) =>
                this._adjustRemainingTurnInteractions(
                    P.InteractionType.move,
                    movement.destination.piece,
                    eventData) === void (0));

            this._game.events.pieceAttacked.subscribe((attack, eventData) =>
                this._adjustRemainingTurnInteractions(
                    P.InteractionType.attack,
                    attack.target,
                    eventData) === void (0));
        }

        private _turnStarted(team: P.IPieceOwner): void {
            this._currentTurnInteractionTypes = this._turnDefinition.interactionTypes.slice(0);
        }

        private _adjustRemainingTurnInteractions(
            completedInteractionType: P.InteractionType,
            piece: P.Piece,
            eventData: TypeScript.EventCallbackSet): void {

            if (piece.hasBeenTaken()) { return; }

            var turnInteractionIndex = this._currentTurnInteractionTypes.indexOf(completedInteractionType);

            this._currentTurnInteractionTypes = this._currentTurnInteractionTypes.slice(
                turnInteractionIndex + 1,
                this._currentTurnInteractionTypes.length);

            if (this._currentTurnInteractionTypes.length === 0) {
                eventData.whenEventCompletes(() => this._game.events.turnEnded.publish(piece.team));
            }
        }

        public getCurrentlySupportedInteractionTypes(forPiece: P.Piece): Array<P.InteractionType> {
            return (forPiece.team === this._game.status.turnManager.currentTeam)
                ? this._currentTurnInteractionTypes
                : this._turnDefinition.interactionTypes;
        }
    }
} 