module AgileObjects.BoardGameEngine.Boards {
    import Pieces = BoardGameEngine.Pieces;
    import Teams = BoardGameEngine.Teams;

    export class Board {
        private _tilesByCoordinates: P.IPieceLocationDictionary;
        private _boardPositionsByTeam: Ts.Dictionary<T.Team, BoardPosition>;

        constructor(public type: BoardType, private _events: G.GameEventSet) {
            this._boardPositionsByTeam = new TypeScript.Dictionary<T.Team, BoardPosition>();

            this._createTiles();
        }

        private _createTiles(): void {
            this.rows = this.type.createRows();
            this._tilesByCoordinates = {};
            for (var rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                var row = this.rows[rowIndex];
                for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                    var tile = row[columnIndex];
                    if (tile.isGameTile) {
                        this._tilesByCoordinates[tile.coordinates.signature] = tile;
                    }
                }
            }

            Pieces.TakenPieceLocation.create(this._events);
        }

        public rows: Array<Array<BoardTile>>;

        public getTiles(): P.IPieceLocationDictionary {
            return this._tilesByCoordinates;
        }

        public add(team: T.Team): void {
            var position = this.type.getNextBoardPosition(this._boardPositionsByTeam.values);
            this._boardPositionsByTeam.add(team, position);
            var pieces = team.getPieces();
            for (var pieceId in pieces) {
                var piece = pieces[pieceId];
                var pieceCoordinates = team.getInitialCoordinatesFor(piece);
                var translatedCoordinates = position.translate(pieceCoordinates);
                var location = this._tilesByCoordinates[translatedCoordinates.signature];
                while (location.isOccupied()) { location = location.piece; }
                location.add(piece);
            }

            var teamAdditionData = new TeamAdditionData(team, position, this._tilesByCoordinates);
            this._events.teamAdded.publish(teamAdditionData);
        }

        public remove(team: T.Team): void {
            var pieces = team.getPieces();
            for (var pieceId in pieces) {
                var piece = pieces[pieceId];
                piece.setLocation(Pieces.NullPieceLocation.INSTANCE);
            }
            this._boardPositionsByTeam.remove(team);
            this._events.teamRemoved.publish(team);
        }

        public orientTo(team: T.Team): void {
            var subjectTeamPosition = this._boardPositionsByTeam.get(team);
            if (this.type.orientationTranslator.focusPositionIs(subjectTeamPosition)) { return; }
            // TODO: Orientation translation; re-arrange the BoardTiles so that the given Team is moved to the focus position
        }
    }
}