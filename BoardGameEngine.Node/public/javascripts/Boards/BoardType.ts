module AgileObjects.BoardGameEngine.Boards {

    export class BoardType implements TypeScript.IEntity<string> {
        constructor(
            public id: string,
            public name: string,
            private _positions: Array<BoardPosition>,
            private _rowConfigs: Array<BoardRowConfig>,
            public orientationTranslator: BoardOrientationTranslator) {

            this.gridSize = this._rowConfigs.length;

            for (var i = 0; i < this._positions.length; i++) {
                this._positions[i].setGridSize(this.gridSize);
                if (this._positions[i].isFocusPosition) {
                    this.orientationTranslator.setFocusPosition(this._positions[i]);
                }
            }
        }

        public gridSize: number;

        public createRows(): Array<Array<BoardTile>> {
            var rows = new Array<Array<BoardTile>>();
            for (var rowNumber = this._rowConfigs.length; rowNumber > 0; rowNumber--) {
                rows.push(this._rowConfigs[rowNumber - 1].createRow(rowNumber));
            }
            return rows;
        }

        public getNextBoardPosition(teamIndex: number): BoardPosition {
            return this._positions[teamIndex];
        }
    }
}