module AgileObjects.BoardGameEngine.Status {

    export class TurnRegulator implements Pieces.IPieceInteractionRegulator {
        private _currentTeam: Pieces.IPieceOwner;
        private _currentTurnInteractions: Array<Pieces.InteractionType>;

        constructor(private _turnInteractions: Array<Pieces.InteractionType>, private _events: Games.GameEventSet) {
            this._events.turnStarted.subscribe(team => this._turnStarted(team));
            this._events.pieceMoved.subscribe((movement, eventData) => this._adjustRemainingTurnInteractions(Pieces.InteractionType.move, movement.destination.piece, eventData));
            this._events.pieceAttacked.subscribe((attack, eventData) => this._adjustRemainingTurnInteractions(Pieces.InteractionType.attack, attack.target, eventData));
        }

        private _turnStarted(team: Pieces.IPieceOwner): boolean {
            this._currentTeam = team;
            this._currentTurnInteractions = this._turnInteractions.slice(0);
            return true;
        }

        private _adjustRemainingTurnInteractions(
            completedInteractionType: Pieces.InteractionType,
            piece: Pieces.Piece,
            eventData: TypeScript.EventCallbackSet): boolean {

            if (this._pieceHasBeenMovedToTakenPieceLocation(piece)) { return true; }

            var turnMovementIndex = this._currentTurnInteractions.indexOf(completedInteractionType);

            this._currentTurnInteractions = this._currentTurnInteractions.slice(
                turnMovementIndex + 1,
                this._currentTurnInteractions.length);

            if (this._currentTurnInteractions.length === 0) {
                eventData.whenEventCompletes(() => this._events.turnEnded.publish(piece.team));
            }

            return true;
        }

        private _pieceHasBeenMovedToTakenPieceLocation(piece: Pieces.Piece): boolean {
            return piece.location.coordinates.row === undefined;
        }

        public getCurrentlySupportedInteractions(forPiece: Pieces.Piece): Array<Pieces.InteractionType> {
            return (forPiece.team === this._currentTeam) ? this._currentTurnInteractions : this._turnInteractions;
        }
    }
} 