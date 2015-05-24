module AgileObjects.BoardGameEngine.Pieces {

    var _noInteractions = <Ts.IStringDictionary<IPieceInteraction>>{};

    export class PieceInteractionProfile {
        private _piece: Piece;

        constructor(
            private _interactionCalculators: Array<PieceInteractionCalculator>,
            private _pieceTakenProcessors: Array<ITakenPieceProcessor>,
            private _pieceId: string,
            private _game: G.Game) {

            this._game.events.gameStarted.subscribe(() => {
                for (var i = 0; i < this._game.teams.length; i++) {
                    var piecesById = this._game.teams[i].getPieces();
                    if (piecesById.hasOwnProperty(this._pieceId)) {
                        this._piece = piecesById[this._pieceId];
                        break;
                    }
                }
                if (this._piece === undefined) {
                    throw new Error("Unable to find piece " + this._pieceId);
                }
                return true;
            });
        }

        public getPotentialInteractions(): Ts.IStringDictionary<IPieceInteraction> {
            var supportedTypes = this._game.status.turnManager.regulator
                .getCurrentlySupportedInteractionTypes(this._piece.team);

            if (supportedTypes.length === 0) { return _noInteractions; }

            var allInteractions: Ts.IStringDictionary<IPieceInteraction> = {};
            for (var i = 0; i < this._interactionCalculators.length; i++) {
                var interactionCalculator = this._interactionCalculators[i];
                if (supportedTypes.indexOf(interactionCalculator.type) === -1) { continue; }
                var interactions = interactionCalculator.getPotentialInteractions(this._piece.location, this._game);
                for (var j = 0; j < interactions.length; j++) {
                    allInteractions[interactions[j].id] = interactions[j];
                }
            }
            return allInteractions;
        }

        public handlePieceTaken(originalPieceLocation: IPieceLocation) {
            for (var i = 0; i < this._pieceTakenProcessors.length; i++) {
                this._pieceTakenProcessors[i].process(this._piece, originalPieceLocation);
            }
        }
    }
}