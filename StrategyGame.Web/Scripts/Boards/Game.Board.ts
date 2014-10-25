module AgileObjects.StrategyGame.Game {

    export class Board {
        private _tilesByCoordinates: AgileObjects.TypeScript.IStringDictionary<BoardTile>;
        private _teams: Array<Team>;

        constructor(public gridSize: number) {
            this._createTiles();
            this.pieceMover = new PieceMover(this._tilesByCoordinates);
            this._teams = new Array<Team>();
        }

        private _createTiles(): void {
            this.tiles = new Array<BoardTile>();
            this._tilesByCoordinates = {};
            for (var row = 0; row < this.gridSize; row++) {
                for (var column = 0; column < this.gridSize; column++) {
                    var coordinates = coordinatesRegistry.get(row + 1, column + 1);
                    var tile = new BoardTile(coordinates);
                    this._tilesByCoordinates[coordinates.signature] = tile;
                    this.tiles.push(tile);
                }
            }
        }

        public tiles: Array<BoardTile>;
        public pieceMover: PieceMover;
        public size: number;

        public add(team: Team, position: BoardPosition) {
            var startingFormation = team.getStartingFormation();
            for (var i = 0; i < startingFormation.tileConfigs.length; i++) {
                var tileConfig = startingFormation.tileConfigs[i];
                var translatedCoordinates = position.translate(tileConfig.tileCoordinates, this.gridSize);
                var tile = this._tilesByCoordinates[translatedCoordinates.signature];
                tile.add(tileConfig.piece);
            }
        }
    }
}