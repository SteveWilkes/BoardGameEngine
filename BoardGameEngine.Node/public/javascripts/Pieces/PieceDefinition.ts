module AgileObjects.BoardGameEngine.Pieces {

    export class PieceDefinition {
        private _vitalStats: Array<number>;

        constructor(
            public id: string,
            public name: string,
            public imageSource: string,
            vitalStats: Array<string>,
            private _interactionProfileFactory: (pieceId: string, game: G.Game) => PieceInteractionProfile) {

            this._vitalStats = new Array<number>(vitalStats.length);

            for (var i = 0; i < vitalStats.length; i++) {
                this._vitalStats[i] = parseFloat(vitalStats[i]);
            }
        }

        public createPiece(pieceId: string, teamNumber: number, game: G.Game): Piece {
            var imageSource = this.imageSource;
            var imageExtensionIndex = imageSource.lastIndexOf(".");
            imageSource = imageSource.splice(imageExtensionIndex, teamNumber.toString());

            var interactionProfile = this._interactionProfileFactory(pieceId, game);
            var piece = new Piece(pieceId, this.id, imageSource, this._vitalStats, interactionProfile);

            return piece;
        }
    }
}