module AgileObjects.BoardGameEngine.Games {
    import Ts = TypeScript;

    export class PieceWrapper {
        constructor(private _piece: P.Piece) {
            this.id = this._piece.id;
            this.definitionId = this._piece.definitionId;
            this.team = this._piece.team;
        }

        public id: string;
        public definitionId: string;
        public team: P.IPieceOwner;

        public isOccupied() {
            return this._piece.isOccupied();
        }

        get health() {
            return this._piece.health;
        }

        get location() {
            return this._piece.location;
        }

        get piece() {
            return this._piece.piece;
        }

        public hasBeenTaken() {
            return this._piece.hasBeenTaken();
        }

        public getInteractionAt(coordinatesSignatureOrPiece: string|PieceWrapper): P.IPieceInteraction {
            var interaction = this._getInteractionAt(coordinatesSignatureOrPiece);

            if (interaction !== null) {
                return interaction;
            }

            throw new Error("No interaction found at " + coordinatesSignatureOrPiece);
        }

        public hasInteractionAt(coordinatesSignatureOrPiece: string|PieceWrapper): boolean {
            return this._getInteractionAt(coordinatesSignatureOrPiece) !== null;
        }

        private _getInteractionAt(coordinatesSignatureOrPiece: string|PieceWrapper) {
            var interactions = this._piece.interactionProfile.getPotentialInteractions();

            var predicate = (typeof coordinatesSignatureOrPiece === "string")
                ? (inter: IPieceInteraction) => inter.location.coordinates.signature === coordinatesSignatureOrPiece
                : (inter: IPieceInteraction) => inter.location.contains(coordinatesSignatureOrPiece._piece);

            return Ts.Joq
                .select<IPieceInteraction>(interactions)
                .firstOrDefault(predicate);
        }
    }
}