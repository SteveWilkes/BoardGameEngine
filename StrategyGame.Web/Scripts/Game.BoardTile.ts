module AgileObjects.StrategyGame.Game {

    export class BoardTile {
        constructor(public row: number, public column: number) {
            var isEvenRow = row % 2 === 0;
            var isEvenColumn = column % 2 === 0;
            this.isDark = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);
        }

        public isDark: boolean;
        public size: number;
    }
}