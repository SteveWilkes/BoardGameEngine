module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _movementProfile: PieceMovementProfile,
            private _pieceDropHandlerFactory: () => IPieceDropHandler,
            private _attackProfile: PieceAttackProfile) {
        }

        public createPiece(pieceId: string): Piece {
            return new Piece(
                pieceId,
                this.id,
                this.imageSource,
                this._movementProfile,
                this._pieceDropHandlerFactory(),
                this._attackProfile);
        }
    }
}