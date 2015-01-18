module AgileObjects.StrategyGame.Game.Boards {
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export class Board {
        private _tilesByCoordinates: Pieces.IPieceLocationDictionary;
        private _boardPositionsByTeam: TypeScript.Dictionary<Teams.Team, BoardPosition>;

        constructor(public type: BoardType, events: GameEventSet) {
            events.teamAdded.subscribe(team => this._addTeam(team));

            this._createTiles();
            this._boardPositionsByTeam = new TypeScript.Dictionary<Teams.Team, BoardPosition>();

            Pieces.TakenPieceLocation.create(events);
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
        }

        public rows: Array<Array<BoardTile>>;

        public getTiles(): Pieces.IPieceLocationDictionary {
            return this._tilesByCoordinates;
        }

        private _addTeam(team: Teams.Team): boolean {
            var teams = this._boardPositionsByTeam.keys;
            var position = this.type.getNextBoardPosition(teams.length);
            this._boardPositionsByTeam.add(team, position);

            for (var j = 0; j < team.piecesByInitialLocation.count; j++) {
                var pieceLocation = team.piecesByInitialLocation.keys[j];
                var translatedCoordinates = position.translate(pieceLocation);
                var tile = this._tilesByCoordinates[translatedCoordinates.signature];
                tile.add(team.piecesByInitialLocation.get(pieceLocation));
            }

            team.setNumber(this._boardPositionsByTeam.count);

            return true;
        }

        public orientTo(team: Teams.Team): void {
            var subjectTeamPosition = this._boardPositionsByTeam.get(team);
            if (this.type.orientationTranslator.focusPositionIs(subjectTeamPosition)) { return; }
            // TODO: Orientation translation; re-arrange the BoardTiles so that the given Team is moved to the focus position
            /*
            var piecesByCoordinates = new AgileObjects.TypeScript.Dictionary<Coordinates, Piece>();
            var tileCoordinates: string, tile: BoardTile;
            for (tileCoordinates in this._tilesByCoordinates) {
                tile = this._tilesByCoordinates[tileCoordinates];
                var translatedCoordinates = this.type.orientationTranslator.translate(tile.coordinates, subjectTeamPosition);
                piecesByCoordinates.add(translatedCoordinates, tile.piece);
            }
            for (tileCoordinates in this._tilesByCoordinates) {
                tile = this._tilesByCoordinates[tileCoordinates];
                var pieceGetResult = piecesByCoordinates.tryGet(tile.coordinates);
                pieceGetResult.found ? tile.add(pieceGetResult.value) : tile.clear();
            }*/
        }
    }
}