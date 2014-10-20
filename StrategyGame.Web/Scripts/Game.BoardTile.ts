module AgileObjects.StrategyGame.Game {

    export class BoardTile {
        constructor(public row: number, public column: number) {
            var isEvenRow = row % 2 === 0;
            var isEvenColumn = column % 2 === 0;
            this.isDark = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);
        }

        public size: number;
        public isDark: boolean;
        public piece: IPiece;

        public resize(newSize: number, resizeFactor: number): void {
            this.size = newSize;

            if (this.isOccupied()) {
                this.piece.resize(resizeFactor);
            }
        }

        public isOccupied(): boolean {
            return this.piece !== undefined;
        }
    }
}