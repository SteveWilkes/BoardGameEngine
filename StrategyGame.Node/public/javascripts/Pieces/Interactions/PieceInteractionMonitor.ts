module AgileObjects.StrategyGame.Game.Pieces {

    export module PieceInteractionMonitor {

        class PieceInteractionMonitor {
            private _currentTeam: IPieceOwner;
            private _currentOrigin: IPieceLocation;
            private _currentPotentialInteractions: Array<IPieceInteraction>;

            constructor(private _interactionRegulator: IPieceInteractionRegulator, events: GameEventSet) {
                events.turnStarted.subscribe((team: IPieceOwner) => this._turnStarted(team));
                events.pieceSelected.subscribe((piece: Piece) => this._pieceSelected(piece));
                events.pieceDeselected.subscribe((location: IPieceLocation) => this._pieceDeselected(location));
            }

            private _turnStarted(team: IPieceOwner): boolean {
                this._currentTeam = team;
                return true;
            }

            private _pieceSelected(piece: Piece): boolean {
                if (this._handleNonOriginPieceSelected(piece)) { return true; }
                this._currentOrigin = piece.location;
                var supportedInteractionTypes = this._interactionRegulator.getCurrentlySupportedInteractions(piece);
                this._currentPotentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, supportedInteractionTypes);
                for (var i = 0; i < this._currentPotentialInteractions.length; i++) {
                    var interaction = this._currentPotentialInteractions[i];
                    interaction.location.potentialInteraction(interaction);
                }
                return true;
            }

            private _handleNonOriginPieceSelected(selectedPiece: Piece): boolean {
                if (this._currentOrigin === undefined) { return false; }
                if (this._currentOrigin.piece === selectedPiece) { return false; }

                if (this._currentTeam.owns(selectedPiece)) {
                    this._handlePieceDeselection(this._currentOrigin.piece);
                    return false;
                }

                // A piece on a different team has been selected:
                return this._handlePieceDeselection(selectedPiece);
            }

            private _pieceDeselected(destination: IPieceLocation): boolean {
                this._handlePieceDeselection(destination);
                return true;
            }

            private _handlePieceDeselection(destination: IPieceLocation): boolean {
                if (this._currentPotentialInteractions !== undefined) {
                    if (this._currentTeam.owns(this._currentOrigin.piece) && this._currentOrigin.contains(destination)) {
                        if (!this._currentOrigin.isSelected()) {
                            this._currentOrigin.isSelected(true);
                            return true;
                        }

                        this._currentOrigin.isSelected(false);
                    }

                    return this._completeCurrentInteractions(destination);
                }
                return true;
            }

            private _completeCurrentInteractions(destination: IPieceLocation) {
                var interactionsCompleted = false;
                for (var i = 0; i < this._currentPotentialInteractions.length; i++) {
                    var location = this._currentPotentialInteractions[i].location;
                    if (location.contains(destination)) {
                        location.potentialInteraction().complete();
                        interactionsCompleted = true;
                    }
                    location.potentialInteraction(NullPotentialInteraction.INSTANCE);
                }
                this._currentPotentialInteractions = undefined;
                return interactionsCompleted;
            }
        }

        export function create(interactionRegulator: IPieceInteractionRegulator, events: GameEventSet): void {
            // ReSharper disable once WrongExpressionStatement
            new PieceInteractionMonitor(interactionRegulator, events);
        }
    }
}