module AgileObjects.StrategyGame.Game {
    
    export class Piece implements IPiece {

        constructor(
            public id: string,
            public imageSource: string,
            public movementProfile: IPieceMovementProfile,
            private _pieceDropHandler: IPieceDropHandler) {
        }

        public attachedPiece: IPiece;

        public attach(piece: IPiece): void {
            this._pieceDropHandler.handleDrop(this, piece);
        }
    }
}