module AgileObjects.TypeScript {

    function getSignature(row: number, column: number): string {
        return row + "x" + column;
    }

    export class Coordinates {
        static EMPTY = new Coordinates(-1, -1, "Empty");

        constructor(public row: number, public column: number, public signature: string = getSignature(row, column)) {
            this.isEvenRow = this.row % 2 === 0;
            this.isEvenColumn = this.column % 2 === 0;
        }

        public isEvenRow: boolean;
        public isEvenColumn: boolean;

        public left(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(0, -1, distance);
        }

        public upLeft(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(-1, -1, distance);
        }

        public up(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(-1, 0, distance);
        }

        public upRight(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(-1, 1, distance);
        }

        public right(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(0, 1, distance);
        }

        public downRight(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(1, 1, distance);
        }

        public down(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(1, 0, distance);
        }

        public downLeft(distance: number): Array<Coordinates> {
            return this._getCoordinatePath(1, -1, distance);
        }

        private _getCoordinatePath(
            rowIncrement: number,
            columnIncrement: number,
            distance: number): Array<Coordinates> {

            var path = new Array<Coordinates>(distance);
            var coordinates = this;
            for (var i = 0; i < distance; i++) {
                var newRowIndex = coordinates.row + rowIncrement;
                var newColumnIndex = coordinates.column + columnIncrement;
                path[i] = coordinates = new Coordinates(newRowIndex, newColumnIndex);
            }
            return path;
        }
    }

    export class CoordinatesRegistry {
        private _coordinates: TypeScript.IStringDictionary<Coordinates>;

        constructor() {
            this._coordinates = {};
        }

        public get(row: number, column: number): Coordinates {
            var signature = getSignature(row, column);
            var coordinates = this._coordinates[signature];
            if (coordinates === undefined) {
                coordinates = this._coordinates[signature] = new Coordinates(row, column, signature);
            }
            return coordinates;
        }
    }

    export var coordinatesRegistry = new CoordinatesRegistry();
}