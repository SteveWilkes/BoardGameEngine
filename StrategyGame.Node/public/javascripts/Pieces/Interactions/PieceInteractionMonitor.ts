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
            this._events.locationSelected.subscribe(location => this._handleLocationSelected(location));
            this._events.pieceMoving.subscribe(piece => this._showPotentialInteractionsImmediately(piece));
            this._events.pieceDeselected.subscribe(location => this._handleInteractionEnded(location));
            this._events.turnEnded.subscribe(() => this._clearCurrentPieces());
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
                var potentialInteraction = this._currentPotentialInteractions[i];
                interactionsByLocation
                    .getOrAdd(potentialInteraction.location, () => new Array<IPieceInteraction>())
                    .push(potentialInteraction);
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

            if (this._pieceIsSelected()) {
                this._currentlyChosenPiece = this._currentlySelectedPiece;
                this._showPotentialInteractionsFor(this._currentlySelectedPiece);
            }
        }

        private _clearCurrentPotentialInteractions(): void {
            while (this._currentPotentialInteractions.length > 0) {
                var potentialInteraction = this._currentPotentialInteractions.shift();
                for (var i = 0; i < potentialInteraction.path.length; i++) {
                    potentialInteraction.path[i].potentialInteractions(_none);
                }
            }
        }

        private _handleLocationSelected(location: IPieceLocation): boolean {
            if (this._currentlySelectedPiece === undefined) { return false; }

            return this._completeMovementInteraction(location, () => false);
        }

        private _handleInteractionEnded(location: IPieceLocation): boolean {
            if (this._interactionHandled) { return true; }

            this._interactionHandled = true;

            this._clearHighlightTimeouts();

            if (location.contains(this._currentlyChosenPiece)) {

                if (this._pieceHighlightingIsActive()) {
                    this._cancelPieceHighlighting();
                    return true;
                }

                return this._handlePieceClick(location);
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
            var isPieceOwned = this._currentlyChosenPiece.team.isLocal();
            var isPieceFromCurrentTeam = this._currentTeam.owns(this._currentlyChosenPiece);

            if (isPieceFromCurrentTeam) {
                if (!isPieceOwned) {
                    // You've clicked on an enemy Piece during that Piece's Team's turn:
                    return false;
                }

                // You've clicked on one of your Pieces during your turn...
                if (this._pieceIsSelected()) {
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
            if (this._pieceIsSelected()) {
                this._deselectCurrentlySelectedPiece();
            }
        }

        private _handlePieceMove(destination: IPieceLocation): boolean {
            if (this._currentPotentialInteractions.length === 0) {
                this._populatePotentialInteractionsFrom(this._currentlyChosenPiece);
            }

            this._completeMovementInteraction(destination, interaction => {
                return this._selectedPieceDraggedOntoEnemyPieceButNotMoved(interaction.location);
            });

            return true;
        }

        private _completeMovementInteraction(
            destination: IPieceLocation,
            refreshInteractions: (interaction: IPieceInteraction) => boolean): boolean {
            var pieceMoveCompleted;

            this._completeInteractionAt(destination, (interaction, location) => {
                pieceMoveCompleted = location.contains(this._currentlyChosenPiece);
                return refreshInteractions(interaction);
            });

            // ReSharper disable once ConditionIsAlwaysConst
            // ReSharper disable once HeuristicallyUnreachableCode
            if (pieceMoveCompleted) {
                this._clearCurrentPotentialInteractions();
            }

            return pieceMoveCompleted;
        }

        private _completeInteractionAt(
            location: IPieceLocation,
            refreshInteractions: (interaction: IPieceInteraction, location: IPieceLocation) => boolean): void {

            for (var i = 0; i < this._currentPotentialInteractions.length; i++) {
                var interaction = this._currentPotentialInteractions[i];
                for (var j = 0; j < interaction.path.length; j++) {
                    if (interaction.path[j].contains(location)) {
                        interaction.complete();

                        if (refreshInteractions(interaction, interaction.path[j])) {
                            this._showPotentialInteractionsFor(this._currentlyChosenPiece);
                        }

                        return;
                    }
                }
            }
        }

        private _selectedPieceDraggedOntoEnemyPieceButNotMoved(destination: IPieceLocation) {
            return this._pieceIsSelected() &&
                destination.isOccupied() &&
                !this._currentTeam.owns(destination.piece) &&
                !destination.contains(this._currentlyChosenPiece);
        }

        private _pieceIsSelected(): boolean {
            return this._currentlySelectedPiece !== undefined;
        }

        private _clearCurrentPieces(): boolean {
            if (this._pieceHighlightingIsActive()) {
                this._currentlyHighlightedPiece = undefined;
            }
            this._deselectCurrentlySelectedPieceIfRequired();
            return true;
        }
    }
}