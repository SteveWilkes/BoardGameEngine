module AgileObjects.StrategyGame.Game.Boards {

    var placeholderTile = <BoardTile>{ isGameTile: false };

    export class BoardRowConfig {
        constructor(private _tileConfigs: Array<boolean>) {
        }

        public createRow(rowNumber: number, events: GameEventSet): Array<BoardTile> {
            var row = new Array<BoardTile>();
            for (var columnNumber = 1; columnNumber < this._tileConfigs.length + 1; ++columnNumber) {
                if (!this._tileConfigs[columnNumber - 1]) {
                    row.push(placeholderTile);
                    continue;
                }
                var coordinates = TypeScript.coordinatesRegistry.get(rowNumber, columnNumber);
                var tile = new BoardTile(coordinates, events);
                row.push(tile);
            }
            return row;
        }
    }
}