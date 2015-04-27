module AgileObjects.BoardGameEngine.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _interactionProfileFactory: (piece: Piece) => PieceInteractionProfile) {
        }

        public createPiece(pieceId: string, teamNumber: number): Piece {
            var imageSource = this.imageSource;
            var imageExtensionIndex = imageSource.lastIndexOf(".");
            imageSource = imageSource.splice(imageExtensionIndex, teamNumber.toString());

            return new Piece(
                pieceId,
                this.id,
                imageSource,
                this._interactionProfileFactory);
        }
    }
}