module AgileObjects.StrategyGame.Game.Pieces {

    export interface IPiece {
        id: string;
        definitionId: string;
        imageSource: string;
        location: IPieceLocation;
        attachedPiece: IPiece;
        movementProfile: PieceMovementProfile;
        pieceDropHandler: IPieceDropHandler;
    }

    export class Piece implements IPiece {

        constructor(
            public id: string,
            public definitionId: string,
            public imageSource: string,
            public movementProfile: PieceMovementProfile,
            public pieceDropHandler: IPieceDropHandler) {

            this.pieceDropHandler.setTarget(this);
        }

        public location: IPieceLocation;
        public attachedPiece: IPiece;
    }
}