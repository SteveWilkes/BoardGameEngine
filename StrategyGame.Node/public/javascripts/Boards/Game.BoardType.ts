module AgileObjects.StrategyGame.Game {

    export class BoardType {
        constructor(public gridSize: number, private _rowConfigs: Array<BoardRowConfig>) {
        }

        public createRows(): Array<Array<BoardTile>> {
            var rows = new Array<Array<BoardTile>>();
            for (var i = 0; i < this._rowConfigs.length; i++) {
                rows.push(this._rowConfigs[i].createRow(i + 1));
            }
            return rows;
        }
    }
}