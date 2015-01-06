module AgileObjects.StrategyGame.Game.Pieces {

    export class Piece extends PieceLocationBase {
        private _eventsLocal: GameEventSet;

        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public interactionProfile: PieceInteractionProfile,
            events: GameEventSet) {
            super(events);

            this._eventsLocal = events;
            this.health = 100;
        }

        public team: IPieceOwner;
        public location: IPieceLocation;
        public health: number;
        public attachedPiece: Piece;

        public setTeamNumber(teamNumber: number): void {
            var imageExtensionIndex = this.imageSource.lastIndexOf(".");
            this.imageSource = this.imageSource.splice(imageExtensionIndex, teamNumber.toString());
        }

        public setLocation(location: IPieceLocation): void {
            this.location = location;
            location.piece = this;
            this.coordinates = location.coordinates;
        }

        public applyAttackBy(attacker: Piece): void {
            var attack = new PieceAttack(attacker, this, 35);

            this.health -= attack.damage;

            this._eventsLocal.pieceAttacked.publish(attack);

            if (this.hasBeenTaken()) {
                this._eventsLocal.pieceTaken.publish(this);
            }
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

        public movePieceThrough(path: Array<IPieceLocation>): void {
            super.movePieceThrough(path);

            this.attachedPiece = undefined;
        }

        // #endregion
    }
}