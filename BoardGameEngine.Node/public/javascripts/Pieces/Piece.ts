module AgileObjects.BoardGameEngine.Pieces {

    export class Piece extends PieceLocationBase {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            interactionProfileFactory: (piece: Piece) => PieceInteractionProfile) {
            super();

            this.interactionProfile = interactionProfileFactory(this);
            this.health = 100;

            // Set to zero when the Piece is first added to the Board:
            this.moveCount = -1; 
        }

        public team: IPieceOwner;
        public interactionProfile: PieceInteractionProfile;
        public health: number;
        public location: IPieceLocation;
        public attachedPiece: Piece;
        public moveCount: number;

        public setLocation(location: IPieceLocation): void {
            this.location = location;
            location.piece = this;
            this.coordinates = location.coordinates;
            ++this.moveCount;
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