module AgileObjects.StrategyGame.Game.Boards {
    import Pieces = StrategyGame.Game.Pieces;
    import Teams = StrategyGame.Game.Teams;

    export class Board {
        private _tilesByCoordinates: TypeScript.IStringDictionary<Pieces.IPieceLocation>;
        private _boardPositionsByTeam: TypeScript.Dictionary<Teams.Team, BoardPosition>;

        constructor(public type: BoardType, private _teams: Array<Teams.Team>, events: EventSet) {
            this._createTiles();
            this._positionTeams();
            Pieces.PieceMover.create(this._tilesByCoordinates, events);
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

        private _positionTeams(): void {
            this._boardPositionsByTeam = new TypeScript.Dictionary<Teams.Team, BoardPosition>();
            for (var i = 0; i < this._teams.length; i++) {
                var startingFormation = this._teams[i].startingFormation;
                var position = this.type.getNextBoardPosition(i, this._teams.length);
                this._boardPositionsByTeam.add(this._teams[i], position);
                for (var j = 0; j < startingFormation.tileConfigs.length; j++) {
                    var tileConfig = startingFormation.tileConfigs[j];
                    var translatedCoordinates = position.translate(tileConfig.tileCoordinates);
                    var tile = this._tilesByCoordinates[translatedCoordinates.signature];
                    tile.add(tileConfig.piece);
                }
            }
        }

        public rows: Array<Array<BoardTile>>;

        public orientTo(team: Teams.Team): void {
            var subjectTeamPosition = this._boardPositionsByTeam.get(team);
            if (this.type.orientationTranslator.focusPositionIs(subjectTeamPosition)) { return; }
            // TODO: Orientation translation; re-arrange the BoardTiles so that the given Team is moved to the focus position
            /*
            var piecesByCoordinates = new AgileObjects.TypeScript.Dictionary<Coordinates, IPiece>();
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