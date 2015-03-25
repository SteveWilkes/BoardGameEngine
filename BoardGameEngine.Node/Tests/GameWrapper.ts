module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class GameWrapper {
        constructor(private _game: Game) { }

        public getPieceAt(coordinatesSignature: string): P.Piece {
            try {
                return Ts.Joq
                    .select<Ts.IStringDictionary<P.Piece>>(this._game.teams, team => team.getPieces())
                    .select(pieces => Ts.Joq
                        .select<P.Piece>(pieces)
                        .firstOrDefault(piece => piece.location.coordinates.signature === coordinatesSignature))
                    .first(p => p !== null);
            } catch (e) {
                throw new Error("No piece found at " + coordinatesSignature + ": " + e);
            }
        }

        public getInteractionAt(coordinatesSignature: string, piece: P.Piece): P.IPieceInteraction;
        public getInteractionAt(targetPiece: P.Piece, piece: P.Piece): P.IPieceInteraction;
        public getInteractionAt(coordinatesSignatureOrPiece: any, piece: P.Piece): P.IPieceInteraction {
            var interaction = this._getInteractionAt(coordinatesSignatureOrPiece, piece);

            if (interaction !== null) {
                return interaction;
            }

            throw new Error("No interaction found at " + coordinatesSignatureOrPiece);
        }

        public hasInteractionAt(coordinatesSignature: string, piece: P.Piece): boolean;
        public hasInteractionAt(targetPiece: P.Piece, piece: P.Piece): boolean;
        public hasInteractionAt(coordinatesSignatureOrPiece: any, piece: P.Piece): boolean {
            return this._getInteractionAt(coordinatesSignatureOrPiece, piece) !== null;
        }

        private _getInteractionAt(coordinatesSignatureOrPiece: any, piece: P.Piece) {
            var interactions = piece.interactionProfile.getPotentialInteractions(piece, this._game);

            var predicate = (typeof coordinatesSignatureOrPiece === "string")
                ? (inter: IPieceInteraction) => inter.location.coordinates.signature === coordinatesSignatureOrPiece
                : (inter: IPieceInteraction) => inter.location.contains(coordinatesSignatureOrPiece);

            return Ts.Joq
                .select<IPieceInteraction>(interactions)
                .firstOrDefault(predicate);
        }

        public startNextTurn(): void {
            var nextTeamIndex = (this._game.status.turnManager.currentTeam === this._game.teams[0]) ? 1 : 0;
            this._game.events.turnValidated.publish(this._game.teams[nextTeamIndex]);
        }
    }
}