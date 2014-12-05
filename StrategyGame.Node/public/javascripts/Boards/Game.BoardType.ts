module AgileObjects.StrategyGame.Game {

    export class BoardType {
        constructor(
            private _availablePositions: Array<BoardPosition>,
            private _rowConfigs: Array<BoardRowConfig>) {

            this.gridSize = this._rowConfigs.length;

            for (var i = 0; i < this._availablePositions.length; i++) {
                this._availablePositions[i].setGridSize(this.gridSize);
            }
        }

        public gridSize: number;

        public createRows(): Array<Array<BoardTile>> {
            var rows = new Array<Array<BoardTile>>();
            for (var i = 0; i < this._rowConfigs.length; i++) {
                rows.push(this._rowConfigs[i].createRow(i + 1));
            }
            return rows;
        }

        public getNextBoardPosition(teamIndex: number, totalNumberOfTeams: number): BoardPosition {
            var positionIndex = teamIndex * (this._availablePositions.length / totalNumberOfTeams);

            return this._availablePositions[positionIndex];
        }
    }
}