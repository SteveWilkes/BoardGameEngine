module AgileObjects.BoardGameEngine.Pieces {

    export class Piece extends PieceLocationBase {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public interactionProfile: PieceInteractionProfile) {
            super();

            this.health = 100;
        }

        public team: IPieceOwner;
        public location: IPieceLocation;
        public health: number;
        public attachedPiece: Piece;

        public setLocation(location: IPieceLocation): void {
            this.location = location;
            location.piece = this;
            this.coordinates = location.coordinates;
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