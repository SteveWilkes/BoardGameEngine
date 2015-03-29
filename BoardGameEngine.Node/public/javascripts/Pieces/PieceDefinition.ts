module AgileObjects.BoardGameEngine.Pieces {

    export class PieceDefinition {

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            private _interactionProfileId: string) {
        }

        public createPiece(pieceId: string, teamNumber: number): Piece {
            var imageSource = this.imageSource;
            var imageExtensionIndex = imageSource.lastIndexOf(".");
            imageSource = imageSource.splice(imageExtensionIndex, teamNumber.toString());

            return new Piece(
                pieceId,
                this.id,
                imageSource,
                this._interactionProfileId);
        }
    }
}