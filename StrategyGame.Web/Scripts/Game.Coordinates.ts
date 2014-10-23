module AgileObjects.StrategyGame.Game {

    export class Coordinates {
        private _signature: string;

        constructor(public row: number, public column: number) {
            this._signature = row + "x" + column;
            this.isEvenRow = this.row % 2 === 0;
            this.isEvenColumn = this.column % 2 === 0;
        }

        public isEvenRow: boolean;
        public isEvenColumn: boolean;

        public left(distance: number): Coordinates {
            return new Coordinates(this.row, this.column - distance);
        }

        public upLeft(distance: number): Coordinates {
            return new Coordinates(this.row - distance, this.column - distance);
        }

        public up(distance: number): Coordinates {
            return new Coordinates(this.row - distance, this.column);
        }

        public upRight(distance: number): Coordinates {
            return new Coordinates(this.row - distance, this.column + distance);
        }

        public right(distance: number): Coordinates {
            return new Coordinates(this.row, this.column + distance);
        }

        public downRight(distance: number): Coordinates {
            return new Coordinates(this.row + distance, this.column + distance);
        }

        public down(distance: number): Coordinates {
            return new Coordinates(this.row + distance, this.column);
        }

        public downLeft(distance: number): Coordinates {
            return new Coordinates(this.row + distance, this.column - distance);
        }

        public toString(): string {
            return this._signature;
        }
    }
}