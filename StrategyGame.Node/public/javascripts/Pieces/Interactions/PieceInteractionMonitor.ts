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
                if ((this._currentOrigin !== undefined) && (this._currentOrigin.piece !== piece)) {
                    this._pieceDeselected(this._currentOrigin.piece);
                }
                this._currentOrigin = piece.location;
                var supportedInteractionTypes = this._interactionRegulator.getCurrentlySupportedInteractions(piece.team);
                this._currentPotentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, supportedInteractionTypes);
                for (var i = 0; i < this._currentPotentialInteractions.length; i++) {
                    var interaction = this._currentPotentialInteractions[i];
                    interaction.location.potentialInteraction(interaction);
                }
                return true;
            }

            private _pieceDeselected(destination: IPieceLocation): boolean {
                if (this._currentPotentialInteractions !== undefined) {
                    if (this._currentTeam.owns(this._currentOrigin.piece) && this._currentOrigin.contains(destination)) {
                        if (this._currentOrigin.isSelected()) {
                            this._currentOrigin.isSelected(false);
                        } else {
                            this._currentOrigin.isSelected(true);
                            return true;
                        }
                    }
                    for (var i = 0; i < this._currentPotentialInteractions.length; i++) {
                        var location = this._currentPotentialInteractions[i].location;
                        if (location.contains(destination)) {
                            location.potentialInteraction().complete();
                        }
                        location.potentialInteraction(NullPotentialInteraction.instance);
                    }
                    this._currentPotentialInteractions = undefined;
                }
                return true;
            }
        }

        export function create(interactionRegulator: IPieceInteractionRegulator, events: GameEventSet): void {
            // ReSharper disable once WrongExpressionStatement
            new PieceInteractionMonitor(interactionRegulator, events);
        }
    }
}