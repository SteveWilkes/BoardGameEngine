module AgileObjects.StrategyGame.Game {

    export class Board {
        private _teams: Array<Team>;
        private _tilesByCoordinates: AgileObjects.TypeScript.IStringDictionary<BoardTile>;

        constructor(public type: BoardType, events: EventSet) {
            this._teams = new Array<Team>();

            this._createTiles();
            PieceMover.create(this._tilesByCoordinates, events);
        }

        private _createTiles(): void {
            this.rows = this.type.createRows();
            this._tilesByCoordinates = {};
            for (var rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                var row = this.rows[rowIndex];
                for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                    var tile = row[columnIndex];
                    if (tile.position !== undefined) {
                        this._tilesByCoordinates[tile.position.signature] = tile;
                    }
                }
            }
        }

        public rows: Array<Array<BoardTile>>;

        public add(team: Team, position: BoardPosition) {
            var startingFormation = team.getStartingFormation();
            for (var i = 0; i < startingFormation.tileConfigs.length; i++) {
                var tileConfig = startingFormation.tileConfigs[i];
                var translatedCoordinates = position.translate(tileConfig.tileCoordinates, this.type.gridSize);
                var tile = this._tilesByCoordinates[translatedCoordinates.signature];
                tile.add(tileConfig.piece);
            }
        }
    }
}