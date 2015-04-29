module AgileObjects.BoardGameEngine.Status {

    export class TurnRegulator implements P.IPieceInteractionRegulator {
        private _currentTurnInteractions: Array<P.InteractionType>;

        constructor(private _turnInteractions: Array<P.InteractionType>, private _game: G.Game) {
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
            this._currentTurnInteractions = this._turnInteractions.slice(0);
        }

        private _adjustRemainingTurnInteractions(
            completedInteractionType: P.InteractionType,
            piece: P.Piece,
            eventData: TypeScript.EventCallbackSet): void {

            if (piece.hasBeenTaken()) { return; }

            var turnInteractionIndex = this._currentTurnInteractions.indexOf(completedInteractionType);

            this._currentTurnInteractions = this._currentTurnInteractions.slice(
                turnInteractionIndex + 1,
                this._currentTurnInteractions.length);

            if (this._currentTurnInteractions.length === 0) {
                eventData.whenEventCompletes(() => this._game.events.turnEnded.publish(piece.team));
            }
        }

        public getCurrentlySupportedInteractions(forPiece: P.Piece): Array<P.InteractionType> {
            return (forPiece.team === this._game.status.turnManager.currentTeam)
                ? this._currentTurnInteractions
                : this._turnInteractions;
        }
    }
} 