module AgileObjects.StrategyGame.Game {

    export class Piece implements IPiece {

        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public movementProfile: IPieceMovementProfile,
            public pieceDropHandler: IPieceDropHandler) {

            this.pieceDropHandler.setTarget(this);
        }

        public location: IPieceLocation;
        public attachedPiece: IPiece;
    }
}