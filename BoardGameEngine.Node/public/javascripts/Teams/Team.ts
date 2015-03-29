module AgileObjects.BoardGameEngine.Teams {

    export class Team implements Pieces.IPieceOwner {
        private _piecesById: TypeScript.IStringDictionary<Pieces.Piece>;

        constructor(
            public owner: ITeamOwner,
            public name: string,
            private _pieceInitialCoordinates: TypeScript.Dictionary<Pieces.Piece, TypeScript.Coordinates>) {

            this.id = owner.getNextTeamId();
            this._piecesById = {};
            for (var i = 0; i < this._pieceInitialCoordinates.count; i++) {
                var piece = this._pieceInitialCoordinates.keys[i];
                piece.team = this;
                this._piecesById[piece.id] = piece;
            }

            owner.add(this);
        }

        public id: string;

        public getPieces(): TypeScript.IStringDictionary<Pieces.Piece> {
            return this._piecesById;
        }

        public getInitialCoordinatesFor(piece: Pieces.Piece): TypeScript.Coordinates {
            var pieceIndex = this._pieceInitialCoordinates.keys.indexOf(piece);
            return this._pieceInitialCoordinates.values[pieceIndex];
        }

        // TODO: Remove
        public isLocal(): boolean { return this.owner.isLocal; }

        public owns(piece: Pieces.Piece): boolean {
            return this._pieceInitialCoordinates.keys.indexOf(piece) > -1;
        }
    }
} 