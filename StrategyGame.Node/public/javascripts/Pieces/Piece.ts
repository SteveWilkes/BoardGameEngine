module AgileObjects.StrategyGame.Game.Pieces {

    export class Piece extends PieceLocationBase {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public movementProfile: PieceMovementProfile,
            public pieceDropHandler: IPieceDropHandler,
            public attackProfile: PieceAttackProfile,
            events: EventSet) {
            super(events);

            this.pieceDropHandler.setTarget(this);
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

        public setPotentialDestination(switchOn: boolean): void {
            this.location.setPotentialDestination(switchOn);
        }

        // #endregion
    }
}