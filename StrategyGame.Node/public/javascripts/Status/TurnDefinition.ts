module AgileObjects.StrategyGame.Game.Status {

    export class TurnDefinition implements Pieces.IPieceInteractionRegulator {
        private _currentTeam: Pieces.IPieceOwner;
        private _currentTurnInteractions: Array<Pieces.InteractionType>;

        constructor(private _turnInteractions: Array<Pieces.InteractionType>, private _events: GameEventSet) {
            this._events.turnStarted.subscribe(team => this._turnStarted(team));
            this._events.pieceMoved.subscribe((movement, eventData) => this._adjustRemainingTurnInteractions(Pieces.InteractionType.Move, movement.destination.piece, eventData));
            this._events.pieceAttacked.subscribe((piece, eventData) => this._adjustRemainingTurnInteractions(Pieces.InteractionType.Attack, piece, eventData));
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

            var turnMovementIndex = this._currentTurnInteractions.indexOf(completedInteractionType);

            this._currentTurnInteractions = this._currentTurnInteractions.slice(
                turnMovementIndex + 1,
                this._currentTurnInteractions.length);

            if (this._currentTurnInteractions.length === 0) {
                eventData.whenEventCompletes(() => {
                    this._events.turnEnded.publish(piece.team);
                });
            }

            return true;
        }

        public getCurrentlySupportedInteractions(forTeam: Pieces.IPieceOwner): Array<Pieces.InteractionType> {
            return (forTeam === this._currentTeam) ? this._currentTurnInteractions : this._turnInteractions;
        }
    }
} 