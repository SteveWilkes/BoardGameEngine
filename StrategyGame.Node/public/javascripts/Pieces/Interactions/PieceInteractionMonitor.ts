module AgileObjects.StrategyGame.Game.Pieces {

    var _none = new Array<IPieceInteraction>(0);

    export class PieceInteractionMonitor {
        private _currentTeam: IPieceOwner;
        private _currentlyChosenPiece: Piece;
        private _currentlyHighlightedPiece: Piece;
        private _pieceHighlightTimeouts: Array<ng.IPromise<any>>;
        private _currentlySelectedPiece: Piece;
        private _currentPotentialInteractions: Array<IPieceInteraction>;
        private _interactionHandled: boolean;

        constructor(
            private _timeoutService: ng.ITimeoutService,
            private _interactionRegulator: IPieceInteractionRegulator,
            private _events: GameEventSet) {

            this._pieceHighlightTimeouts = new Array<ng.IPromise<any>>();
            this._currentPotentialInteractions = _none;
        }

        public begin() {
            this._events.turnStarted.subscribe(team => this._updateCurrentTeam(team));
            this._events.pieceSelected.subscribe(piece => this._showPotentialInteractionsAfterDelay(piece));
            this._events.pieceMoving.subscribe(piece => this._showPotentialInteractionsImmediately(piece));
            this._events.pieceDeselected.subscribe(location => this._handleInteractionEnded(location));
        }

        private _updateCurrentTeam(team: IPieceOwner): boolean {
            this._currentTeam = team;
            return true;
        }

        private _showPotentialInteractionsAfterDelay(piece: Piece): boolean {
            this._interactionHandled = false;
            this._currentlyChosenPiece = piece;
            this._pieceHighlightTimeouts.push(this._timeoutService(() => {
                if (piece === this._currentlyChosenPiece) {
                    this._currentlyHighlightedPiece = this._currentlyChosenPiece;
                    this._showPotentialInteractionsFor(this._currentlyHighlightedPiece);
                }
            }, 500));
            return true;
        }

        private _showPotentialInteractionsImmediately(piece: Piece): boolean {
            this._clearHighlightTimeouts();
            this._showPotentialInteractionsFor(piece);
            return true;
        }

        private _showPotentialInteractionsFor(piece: Piece): void {
            this._clearCurrentPotentialInteractions();
            this._populatePotentialInteractionsFrom(piece);
            var interactionsByLocation = new TypeScript.Dictionary<IPieceLocation, Array<IPieceInteraction>>();
            var i;
            for (i = 0; i < this._currentPotentialInteractions.length; i++) {
                interactionsByLocation
                    .getOrAdd(this._currentPotentialInteractions[i].location, () => new Array<IPieceInteraction>())
                    .push(this._currentPotentialInteractions[i]);
            }

            for (i = 0; i < interactionsByLocation.count; i++) {
                interactionsByLocation.keys[i].potentialInteractions(interactionsByLocation.values[i]);
            }
        }

        private _populatePotentialInteractionsFrom(piece: Piece): void {
            var supportedInteractionTypes = this._interactionRegulator.getCurrentlySupportedInteractions(piece);
            this._currentPotentialInteractions = piece.interactionProfile.getPotentialInteractions(piece, supportedInteractionTypes);
        }

        private _cancelPieceHighlighting(): void {
            this._clearCurrentPotentialInteractions();
            this._currentlyHighlightedPiece = undefined;

            if (this._currentlySelectedPiece !== undefined) {
                this._showPotentialInteractionsFor(this._currentlySelectedPiece);
            }
        }

        private _clearCurrentPotentialInteractions(): void {
            while (this._currentPotentialInteractions.length > 0) {
                this._currentPotentialInteractions.shift().location.potentialInteractions(_none);
            }
        }

        private _handleInteractionEnded(location: IPieceLocation): boolean {
            if (this._interactionHandled) { return true; }

            this._interactionHandled = true;

            this._clearHighlightTimeouts();

            if (location.contains(this._currentlyChosenPiece)) {

                if (this._pieceHighlightingIsActive()) {
                    // The mouse has been released after a piece was highlighted by a held left click:
                    this._cancelPieceHighlighting();
                    return true;
                }

                return this._handlePieceClick(location);
            }

            if (!location.isOccupied()) {
                // TODO: Handle empty BoardTile clicks
            }

            return this._handlePieceMove(location);
        }

        private _clearHighlightTimeouts(): void {
            while (this._pieceHighlightTimeouts.length > 0) {
                this._timeoutService.cancel(this._pieceHighlightTimeouts.shift());
            }
        }

        private _pieceHighlightingIsActive(): boolean {
            return this._currentlyHighlightedPiece !== undefined;
        }

        private _handlePieceClick(location: IPieceLocation): boolean {
            // Release from a click:
            //   If current team:
            //     If piece owned:
            //       If selected: <- done
            //         Hide interactions, deselect
            //       If not selected:
            //         Immediately show interactions, select
            //     If piece not owned:
            //       Do nothing <- done
            //   If non-current team
            //     If piece owned:
            //       Do nothing <- done
            //     If piece not owned:
            //       If attack target:
            //         Apply attack, refresh interactions <- done
            //       If not attack target:
            //         Do nothing <- done

            var isPieceOwned = this._currentlyChosenPiece.team.isLocal();
            var isPieceFromCurrentTeam = this._currentTeam.owns(this._currentlyChosenPiece);

            if (isPieceFromCurrentTeam) {
                if (!isPieceOwned) {
                    // You've clicked on an enemy Piece during that Piece's Team's turn:
                    return false;
                }

                // You've clicked on one of your Pieces during your turn...
                if (this._currentlyChosenPiece.location.isSelected()) {
                    this._deselectCurrentlySelectedPiece();
                    return true;
                }

                this._selectCurrentlyChosenPiece();
                return true;
            }

            // You've clicked on a Piece whose Team does not have the current turn...

            if (isPieceOwned) {
                // You've clicked on one of your own Pieces but it's not the turn of that Piece's Team:
                return false;
            }

            var validEnemyPieceChosen = false;

            this._completeInteractionAt(location, () => {
                // You've clicked on an enemy Piece who was a valid attack target:
                validEnemyPieceChosen = true;
                this._currentlyChosenPiece = this._currentlySelectedPiece;
                return true;
            });

            // ReSharper disable once ExpressionIsAlwaysConst
            return validEnemyPieceChosen;
        }

        private _deselectCurrentlySelectedPiece() {
            this._deselect(this._currentlySelectedPiece);
            this._currentlySelectedPiece = undefined;
        }

        private _deselect(piece: Piece): void {
            this._clearCurrentPotentialInteractions();
            piece.location.isSelected(false);
        }

        private _selectCurrentlyChosenPiece(): void {
            this._deselectCurrentlySelectedPieceIfRequired();

            this._currentlySelectedPiece = this._currentlyChosenPiece;
            this._currentlySelectedPiece.location.isSelected(true);
            this._showPotentialInteractionsFor(this._currentlySelectedPiece);
        }

        private _deselectCurrentlySelectedPieceIfRequired(): void {
            if (this._currentlySelectedPiece !== undefined) {
                this._deselect(this._currentlySelectedPiece);
            }
        }

        private _handlePieceMove(destination: IPieceLocation): boolean {
            // Release from a drag:
            //   If potential interaction location:
            //     Complete interaction, refresh interactions <- done
            //   If not potential interaction location:
            //     Cancel drag <- done

            if (this._currentPotentialInteractions.length === 0) {
                this._populatePotentialInteractionsFrom(this._currentlyChosenPiece);
            }

            this._completeInteractionAt(destination, interaction =>
                this._pieceDraggedOntoEnemyPieceButNotMoved(interaction.location));

            this._clearCurrentPotentialInteractions();

            // Bug: Drag piece onto enemy piece, attack performed but interactions no longer shown

            return true;
        }

        private _completeInteractionAt(
            location: IPieceLocation,
            refreshInteractions: (interaction: IPieceInteraction) => boolean): void {

            for (var i = 0; i < this._currentPotentialInteractions.length; i++) {
                var interaction = this._currentPotentialInteractions[i];
                if (interaction.location.contains(location)) {
                    interaction.complete();

                    if (refreshInteractions(interaction)) {
                        this._showPotentialInteractionsFor(this._currentlyChosenPiece);
                    }

                    return;
                }
            }
        }

        private _pieceDraggedOntoEnemyPieceButNotMoved(destination: IPieceLocation) {
            return destination.isOccupied() &&
                !this._currentTeam.owns(destination.piece) &&
                !destination.contains(this._currentlyChosenPiece);
        }
    }
}