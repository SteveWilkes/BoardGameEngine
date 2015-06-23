module AgileObjects.BoardGameEngine.Teams {

    export class Team implements P.IPieceOwner {
        private _piecesById: Ts.IStringDictionary<P.Piece>;

        constructor(
            public owner: ITeamOwner,
            public name: string,
            private _pieceInitialCoordinates: Ts.Dictionary<P.Piece, Ts.Coordinates>) {

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

        public getPieces(): Ts.IStringDictionary<P.Piece> {
            return this._piecesById;
        }

        public getInitialCoordinatesFor(piece: P.Piece): Ts.Coordinates {
            return this._pieceInitialCoordinates.get(piece);
        }

        public ownerId(): string { return this.owner.id; }

        public isHuman(): boolean { return this.owner.isHuman; }

        public isLocal(): boolean { return this.owner.isLocal; }

        public owns(piece: P.Piece): boolean {
            return this._pieceInitialCoordinates.keys.indexOf(piece) > -1;
        }
    }
} 