module AgileObjects.StrategyGame.Game.Pieces {

    export class Piece implements IPieceLocation {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public movementProfile: PieceMovementProfile,
            public pieceDropHandler: IPieceDropHandler,
            public attackProfile: PieceAttackProfile) {

            this.pieceDropHandler.setTarget(this);
        }

        public team: IPieceOwner;
        public location: IPieceLocation;
        public attachedPiece: Piece;

        public setLocation(location: IPieceLocation): void {
            this.location = location;
            location.piece = this;
            this.coordinates = location.coordinates;
        }

        // #region IPieceLocation Members

        public coordinates: TypeScript.Coordinates;
        public piece: Piece;
        public isPotentialDestination: boolean;
        public potentialAttack: PieceAttack;
        public wasPartOfLastMove: boolean;

        public isOccupied(): boolean {
            return this.attachedPiece !== undefined;
        }

        public add(piece: Piece): void {
            if (this.isOccupied()) {

            } else {
                this.attachedPiece = this.piece = piece;
                piece.setLocation(this);
            }
        }

        public movePieceTo(destination: IPieceLocation): void {
        }

        // #endregion
    }
}