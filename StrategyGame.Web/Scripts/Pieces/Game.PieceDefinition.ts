module AgileObjects.StrategyGame.Game {



    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _movementProfile: IPieceMovementProfile) {
        }

        public createPiece(pieceId: string) {
            return new Piece(pieceId, this.imageSource, this._movementProfile);
        }
    }
}