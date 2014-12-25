module AgileObjects.StrategyGame.Game.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imagePath: string,
            private _movementProfile: PieceMovementProfile,
            private _pieceDropHandlerFactory: () => IPieceDropHandler,
            private _attackProfile: PieceAttackProfile) {
        }

        public createPiece(teamNumber: number, pieceId: string, events: EventSet): Piece {
            return new Piece(
                pieceId,
                this.id,
                this.imagePath + teamNumber + ".png",
                this._movementProfile,
                this._pieceDropHandlerFactory(),
                this._attackProfile,
                events);
        }
    }
}