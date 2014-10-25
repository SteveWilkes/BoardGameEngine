module AgileObjects.StrategyGame.Game {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _movementProfileId: string) {
        }

        public createPiece(pieceId: string) {
            return new Piece(pieceId, this.imageSource, new AnyDirectionMovementProfile(2));
        }
    }
}