module AgileObjects.StrategyGame.Game.Pieces {

    export class Piece extends PieceLocationBase {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public interactionProfile: PieceInteractionProfile,
            events: EventSet) {
            super(events);
        }

        public team: IPieceOwner;
        public location: IPieceLocation;
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