module AgileObjects.BoardGameEngine.Status {

    export class TurnRegulator implements Pieces.IPieceInteractionRegulator {
        private _currentTeam: Pieces.IPieceOwner;
        private _currentTurnInteractions: Array<Pieces.InteractionType>;

        constructor(private _turnInteractions: Array<Pieces.InteractionType>, private _events: Games.GameEventSet) {
            this._events.turnStarted.subscribe(team => this._turnStarted(team));

            this._events.pieceMoved.subscribe((movement, eventData) =>
                this._adjustRemainingTurnInteractions(
                    Pieces.InteractionType.move,
                    movement.destination.piece,
                    eventData) === void (0));

            this._events.pieceAttacked.subscribe((attack, eventData) =>
                this._adjustRemainingTurnInteractions(
                    Pieces.InteractionType.attack,
                    attack.target,
                    eventData) === void(0));
        }

        private _turnStarted(team: Pieces.IPieceOwner): boolean {
            this._currentTeam = team;
            this._currentTurnInteractions = this._turnInteractions.slice(0);
            return true;
        }

        private _adjustRemainingTurnInteractions(
            completedInteractionType: Pieces.InteractionType,
            piece: Pieces.Piece,
            eventData: TypeScript.EventCallbackSet): void {

            if (piece.hasBeenTaken()) { return; }

            var turnInteractionIndex = this._currentTurnInteractions.indexOf(completedInteractionType);

            this._currentTurnInteractions = this._currentTurnInteractions.slice(
                turnInteractionIndex + 1,
                this._currentTurnInteractions.length);

            if (this._currentTurnInteractions.length === 0) {
                eventData.whenEventCompletes(() => this._events.turnEnded.publish(piece.team));
            }
        }

        public getCurrentlySupportedInteractions(forPiece: Pieces.Piece): Array<Pieces.InteractionType> {
            return (forPiece.team === this._currentTeam) ? this._currentTurnInteractions : this._turnInteractions;
        }
    }
} 