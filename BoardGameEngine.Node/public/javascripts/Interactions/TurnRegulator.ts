module AgileObjects.BoardGameEngine.Interactions {

    export class TurnRegulator implements IPieceInteractionRegulator {
        private _previousTurnInteractionIndex: number;

        constructor(private _turnDefinition: TurnDefinition, private _game: G.Game) {
            this._game.events.turnStarted.subscribe(team => this._turnStarted(team) === void (0));

            this._game.events.pieceMoved.subscribe((movement, eventData) =>
                this._adjustRemainingTurnInteractions(
                    InteractionType.move,
                    movement.destination.piece,
                    eventData) === void (0));

            this._game.events.pieceAttacked.subscribe((attack, eventData) =>
                this._adjustRemainingTurnInteractions(
                    InteractionType.attack,
                    attack.target,
                    eventData) === void (0));
        }

        private _turnStarted(team: P.IPieceOwner): void {
            this._previousTurnInteractionIndex = 0;
        }

        private _adjustRemainingTurnInteractions(
            completedInteractionType: InteractionType,
            piece: P.Piece,
            eventData: TypeScript.EventCallbackSet): void {

            if (piece.hasBeenTaken()) { return; }

            this._previousTurnInteractionIndex = this._turnDefinition.interactionSequence.indexOf(
                completedInteractionType,
                this._previousTurnInteractionIndex);

            if (this._previousTurnInteractionIndex === (this._turnDefinition.interactionSequence.length - 1)) {
                eventData.whenEventCompletes(() => this._game.events.turnEnded.publish(piece.team));
            }
        }

        public getCurrentlySupportedInteractionTypes(forPiece: P.Piece): Array<InteractionType> {
            if (forPiece.team !== this._game.status.turnManager.currentTeam) {
                return this._turnDefinition.interactionSequence;
            }

            return this._turnDefinition
                .getRemainingInteractionSequence(this._previousTurnInteractionIndex, this._game);
        }
    }
} 