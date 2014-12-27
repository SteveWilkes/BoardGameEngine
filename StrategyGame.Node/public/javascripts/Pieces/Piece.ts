module AgileObjects.StrategyGame.Game.Pieces {

    export class Piece extends PieceLocationBase {
        private _eventsLocal: EventSet;

        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public interactionProfile: PieceInteractionProfile,
            events: EventSet) {
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

        public applyDamage(damage: number): void {
            this.health -= damage;

            if (this.health <= 0) {
                this._eventsLocal.pieceTaken.publish(this);
            }
        }

        // #region IPieceLocation Members

        public add(piece: Piece): void {
            if (this.isOccupied()) {

            } else {
                this.attachedPiece = this.piece = piece;
                piece.setLocation(this);
            }
        }

        public movePieceTo(destination: Pieces.IPieceLocation): void {
            super.movePieceTo(destination);

            this.attachedPiece = undefined;
        }

        // #endregion
    }
}