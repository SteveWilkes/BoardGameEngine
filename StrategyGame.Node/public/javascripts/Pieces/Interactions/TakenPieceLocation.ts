module AgileObjects.StrategyGame.Game.Pieces {

    export module TakenPieceLocation {
        class TakenPieceLocation implements IPieceLocation {
            private _takenPiecesByTeam: TypeScript.Dictionary<IPieceOwner, Array<Piece>>;

            constructor(events: GameEventSet) {
                events.teamAdded.subscribe(team => this._teamAdded(team));
                events.pieceTaken.subscribe(takenPiece => this._pieceTaken(takenPiece));

                this._takenPiecesByTeam = new TypeScript.Dictionary<IPieceOwner, Array<Piece>>();
            }

            private _teamAdded(team: Teams.Team): boolean {
                this._takenPiecesByTeam.add(team, new Array<Piece>());
                return true;
            }

            private _pieceTaken(takenPiece: Piece): boolean {
                takenPiece.location.movePieceThrough([this]);
                return true;
            }

            public coordinates = <TypeScript.Coordinates>{ signature: "Taken pieces" };
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

            public movePieceThrough(): void { }
        }

        export var create = (events: GameEventSet) => {
            // ReSharper disable once WrongExpressionStatement
            new TakenPieceLocation(events);
        };
    }
}