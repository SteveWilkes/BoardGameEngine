module AgileObjects.BoardGameEngine.Pieces {

    var interactionProfileLibrary = PieceInteractionProfileLibrary.INSTANCE;

    export class Piece extends PieceLocationBase {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            private _interactionProfileId: string) {
            super();

            this.health = 100;

            // Set to zero when the Piece is first added to the Board:
            this.moveCount = -1; 
        }

        public team: IPieceOwner;
        public location: IPieceLocation;
        public health: number;
        public attachedPiece: Piece;
        public moveCount: number;

        public setLocation(location: IPieceLocation): void {
            this.location = location;
            location.piece = this;
            this.coordinates = location.coordinates;
            ++this.moveCount;
        }

        public getPotentialInteractions(game: G.Game): Ts.IStringDictionary<IPieceInteraction> {
            return interactionProfileLibrary
                .get(this._interactionProfileId)
                .getPotentialInteractions(this, game);
        }

        public applyAttackBy(attacker: Piece): number {
            // TODO: Calculate damage:
            var damage = 35;

            this.health -= damage;

            return damage;
        }

        public hasBeenTaken(): boolean {
            return this.health <= 0;
        }

        // #region IPieceLocation Members

        public add(piece: Piece): void {
            if (this.isOccupied()) {

            } else {
                this.attachedPiece = this.piece = piece;
                piece.setLocation(this);
            }
        }

        public movePieceTo(destination: IPieceLocation): void {
            super.movePieceTo(destination);

            this.attachedPiece = undefined;
        }

        // #endregion
    }
}