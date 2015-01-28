module AgileObjects.BoardGameEngine.Teams {

    export class Team implements Pieces.IPieceOwner {
        private _piecesById: TypeScript.IStringDictionary<Pieces.Piece>;

        constructor(
            public id: string,
            public name: string,
            private _piecesByInitialLocation: TypeScript.Dictionary<TypeScript.Coordinates, Pieces.Piece>) {

            this._piecesById = {};
            for (var i = 0; i < this._piecesByInitialLocation.count; i++) {
                var piece = this._piecesByInitialLocation.values[i];
                piece.team = this;
                this._piecesById[piece.id] = piece;
            }
        }

        public owner: ITeamOwner;

        public getPieces(): TypeScript.IStringDictionary<Pieces.Piece> {
            return this._piecesById;
        }

        public getInitialLocationOf(piece: Pieces.Piece): TypeScript.Coordinates {
            var pieceIndex = this._piecesByInitialLocation.values.indexOf(piece);
            return this._piecesByInitialLocation.keys[pieceIndex];
        }

        // TODO: Remove
        public isLocal(): boolean { return this.owner.isLocal; }

        public owns(piece: Pieces.Piece): boolean {
            return this._piecesByInitialLocation.values.indexOf(piece) > -1;
        }
    }
} 