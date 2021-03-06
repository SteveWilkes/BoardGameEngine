﻿module AgileObjects.BoardGameEngine.Boards {
    import Ts = TypeScript;

    var placeholderTile = <BoardTile>{ isGameTile: false };

    export class BoardRowConfig {
        constructor(private _tileConfigs: Array<boolean>) { }

        public createRow(rowNumber: number): Array<BoardTile> {
            var row = new Array<BoardTile>();
            for (var columnNumber = 1; columnNumber < this._tileConfigs.length + 1; ++columnNumber) {
                if (!this._tileConfigs[columnNumber - 1]) {
                    row.push(placeholderTile);
                    continue;
                }
                var coordinates = Ts.CoordinatesLibrary.INSTANCE.get(rowNumber, columnNumber);
                var tile = new BoardTile(coordinates);
                row.push(tile);
            }
            return row;
        }
    }
}