module AgileObjects.StrategyGame.Game.Pieces {

    export class Piece {
        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public movementProfile: PieceMovementProfile,
            public pieceDropHandler: IPieceDropHandler) {

            this.pieceDropHandler.setTarget(this);
        }

        public location: IPieceLocation;
        public attachedPiece: Piece;
    }
}