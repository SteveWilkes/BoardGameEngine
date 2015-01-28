module AgileObjects.TypeScript {

    export class CoordinatesRegistry {
        private _coordinates: TypeScript.IStringDictionary<Coordinates>;

        constructor() {
            this._coordinates = {};
        }

        public get(row: number, column: number): Coordinates {
            var signature = Coordinates.getSignature(row, column);
            var coordinates = this._coordinates[signature];
            if (coordinates === undefined) {
                coordinates = this._coordinates[signature] = new Coordinates(row, column, signature);
            }
            return coordinates;
        }
    }

    export var coordinatesRegistry = new CoordinatesRegistry();
}