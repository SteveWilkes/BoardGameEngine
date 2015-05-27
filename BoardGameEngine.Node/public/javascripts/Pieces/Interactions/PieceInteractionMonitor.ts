module AgileObjects.BoardGameEngine.Pieces {

    var _none = new Array<IPieceInteraction>(0);

    "ClientOnly";
    class PieceInteractionMonitor {
        private _currentlyChosenPiece: Piece;
        private _currentlyHighlightedPiece: Piece;
        private _pieceHighlightTimeouts: Array<ng.IPromise<any>>;
        private _currentlySelectedPiece: Piece;
        private _currentPotentialInteractions: Array<IPieceInteraction>;
        private _interactionHandled: boolean;

        constructor(private _timeoutService: ng.ITimeoutService, private _game: Games.Game) {
            this._subscribeToGameEvents();

            this._pieceHighlightTimeouts = new Array<ng.IPromise<any>>();
            this._currentPotentialInteractions = _none;
        }

        private _subscribeToGameEvents(): void {
            this._game.events.pieceSelected.subscribe(piece => this._showPotentialInteractionsAfterDelay(piece));
            this._game.events.locationSelected.subscribe(location => this._handleLocationSelected(location));
            this._game.events.pieceMoving.subscribe(piece => this._showPotentialInteractionsImmediately(piece));
            this._game.events.pieceDeselected.subscribe(location => this._handleInteractionEnded(location));
            this._game.events.turnEnded.subscribe(() => this._clearCurrentPieces());
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
            if (this._currentlyChosenPieceHasNoInteractions()) {
                return false;
            }

            this._clearHighlightTimeouts();
            this._showPotentialInteractionsFor(piece);
            return true;
        }

        private _showPotentialInteractionsFor(piece: Piece): void {
            var potentialInteractions = this._tryGetPotentialInteractionsFor(piece);
            if (!potentialInteractions) { return; }

            this._clearCurrentPotentialInteractions();
            this._populatePotentialInteractionsFrom(<Ts.IStringDictionary<IPieceInteraction>>potentialInteractions);
            var interactionsByLocation = new TypeScript.Dictionary<IPieceLocation, Array<IPieceInteraction>>();
            var i;
            for (i = 0; i < this._currentPotentialInteractions.length; i++) {
                var potentialInteraction = this._currentPotentialInteractions[i];
                interactionsByLocation
                    .getOrAdd(potentialInteraction.location,() => new Array<IPieceInteraction>())
                    .push(potentialInteraction);
            }

            for (i = 0; i < interactionsByLocation.count; i++) {
                interactionsByLocation.keys[i].potentialInteractions(interactionsByLocation.values[i]);
            }
        }

        private _tryGetPotentialInteractionsFor(piece: Piece): Ts.IStringDictionary<IPieceInteraction>|boolean {
            var potentialInteractions = piece.interactionProfile.getPotentialInteractions();
            for (var i in potentialInteractions) { return potentialInteractions; }
            return false;
        }

        private _populatePotentialInteractionsFrom(potentialInteractions: Ts.IStringDictionary<IPieceInteraction>): void {
            this._currentPotentialInteractions = new Array<IPieceInteraction>();
            for (var interactionId in potentialInteractions) {
                this._currentPotentialInteractions.push(potentialInteractions[interactionId]);
            }
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

            return this._completeMovementInteraction(location,() => false);
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
            var isPieceFromCurrentTeam = this._game.status.turnManager.currentTeam.owns(this._currentlyChosenPiece);

            if (isPieceFromCurrentTeam) {
                if (!isPieceOwned) {
                    // You've clicked on an enemy Piece during that Piece's Team's turn:
                    return false;
                }

                if (this._currentlyChosenPieceHasNoInteractions()) {
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

            this._completeInteractionAt(location,() => {
                // You've clicked on an enemy Piece who was a valid attack target:
                validEnemyPieceChosen = true;
                this._currentlyChosenPiece = this._currentlySelectedPiece;
                return true;
            });

            // ReSharper disable once ExpressionIsAlwaysConst
            return validEnemyPieceChosen;
        }

        private _deselectCurrentlySelectedPiece(): void {
            this._deselect(this._currentlySelectedPiece);
            this._currentlySelectedPiece = undefined;
        }

        private _deselect(piece: Piece): void {
            this._clearCurrentPotentialInteractions();
            piece.location.isSelected(false);
        }

        private _currentlyChosenPieceHasNoInteractions(): boolean {
            return !!!this._tryGetPotentialInteractionsFor(this._currentlyChosenPiece);
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
                var potentialInteractions = this._tryGetPotentialInteractionsFor(this._currentlyChosenPiece);
                if (!potentialInteractions) { return false; }
                this._populatePotentialInteractionsFrom(<Ts.IStringDictionary<IPieceInteraction>>potentialInteractions);
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

            this._completeInteractionAt(destination, interaction => {
                pieceMoveCompleted = interaction.location.contains(this._currentlyChosenPiece);
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

        private _selectedPieceDraggedOntoEnemyPieceButNotMoved(destination: IPieceLocation) {
            return this._pieceIsSelected() &&
                destination.isOccupied() &&
                !this._game.status.turnManager.currentTeam.owns(destination.piece) &&
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

    export var $pieceInteractionMonitorService = "$pieceInteractionMonitorService";

    class PieceInteractionMonitorService implements Ui.IGameUiComponent {
        constructor(private _timeoutService: ng.ITimeoutService) { }

        public initialise(game: Games.Game): void {
            // ReSharper disable once WrongExpressionStatement
            new PieceInteractionMonitor(this._timeoutService, game);
        }
    }

    angular
        .module(strategyGameApp)
        .service($pieceInteractionMonitorService, ["$timeout", PieceInteractionMonitorService]);
}