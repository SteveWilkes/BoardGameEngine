module AgileObjects.BoardGameEngine.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _interactionProfileFactory: (pieceId: string, game: G.Game) => PieceInteractionProfile) {
        }

        public createPiece(pieceId: string, teamNumber: number, game: G.Game): Piece {
            var imageSource = this.imageSource;
            var imageExtensionIndex = imageSource.lastIndexOf(".");
            imageSource = imageSource.splice(imageExtensionIndex, teamNumber.toString());

            var interactionProfile = this._interactionProfileFactory(pieceId, game);
            var piece = new Piece(pieceId, this.id, imageSource, interactionProfile);

            return piece;
        }
    }
}