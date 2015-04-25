module AgileObjects.BoardGameEngine.Pieces {

    export module TakenPieceLocation {
        class TakenPieceLocation implements IPieceLocation {
            private _takenPiecesByTeam: Ts.Dictionary<IPieceOwner, Array<Piece>>;

            constructor(events: Games.GameEventSet) {
                events.teamAdded.subscribe(data => this._takenPiecesByTeam.add(data.team, new Array<Piece>()).count > 0);
                events.teamRemoved.subscribe(team => this._takenPiecesByTeam.remove(team) === void (0));
                events.pieceTaken.subscribe(takenPiece => this._pieceTaken(takenPiece));

                this._takenPiecesByTeam = new TypeScript.Dictionary<IPieceOwner, Array<Piece>>();
            }

            private _pieceTaken(takenPiece: Piece): boolean {
                takenPiece.location.movePieceTo(this);
                return true;
            }

            public coordinates = <Ts.Coordinates>{ signature: "Taken pieces" };
            public piece;
            public potentialInteractions;
            public wasPartOfLastMove;

            public isOccupied(): boolean { return false; }
            public isSelected(): boolean { return false; }

            public add(takenPiece: Piece): void {
                takenPiece.setLocation(this);
                this._takenPiecesByTeam.get(takenPiece.team).push(takenPiece);
            }

            public contains(location: IPieceLocation): boolean {
                for (var i = 0; i < this._takenPiecesByTeam.count; i++) {
                    var pieces = this._takenPiecesByTeam.values[i];
                    for (var j = 0; j < pieces.length; j++) {
                        if (pieces[j].contains(location)) {
                            return true;
                        }
                    }
                }
                return false;
            }

            public movePieceTo(): void { }
        }

        export var create = (events: Games.GameEventSet) => {
            // ReSharper disable once WrongExpressionStatement
            new TakenPieceLocation(events);
        };
    }
}