module AgileObjects.StrategyGame.Boards {
    import Pieces = StrategyGame.Pieces;
    import Teams = StrategyGame.Teams;

    export class Board {
        private _tilesByCoordinates: Pieces.IPieceLocationDictionary;
        private _boardPositionsByTeam: TypeScript.Dictionary<Teams.Team, BoardPosition>;

        constructor(public type: BoardType, private _events: Games.GameEventSet) {
            this._boardPositionsByTeam = new TypeScript.Dictionary<Teams.Team, BoardPosition>();

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

        public getTiles(): Pieces.IPieceLocationDictionary {
            return this._tilesByCoordinates;
        }

        public add(team: Teams.Team): void {
            var position = this.type.getNextBoardPosition(this._boardPositionsByTeam.count);
            this._boardPositionsByTeam.add(team, position);

            var pieces = team.getPieces();
            for (var pieceId in pieces) {
                var piece = pieces[pieceId];
                var pieceLocation = team.getInitialLocationOf(piece);
                var translatedCoordinates = position.translate(pieceLocation);
                var tile = this._tilesByCoordinates[translatedCoordinates.signature];
                tile.add(piece);
            }

            team.setNumber(this._boardPositionsByTeam.count);

            this._events.teamAdded.publish(team);
        }

        public orientTo(team: Teams.Team): void {
            var subjectTeamPosition = this._boardPositionsByTeam.get(team);
            if (this.type.orientationTranslator.focusPositionIs(subjectTeamPosition)) { return; }
            // TODO: Orientation translation; re-arrange the BoardTiles so that the given Team is moved to the focus position
        }
    }
}