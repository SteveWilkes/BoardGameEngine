module AgileObjects.TypeScript {

    export class CoordinatesRegistry {
        static INSTANCE = new CoordinatesRegistry();

        private _coordinates: TypeScript.IStringDictionary<Coordinates>;

        constructor() {
            this._coordinates = {};
        }

        public get(coordinatesSignature: string): Coordinates;
        public get(row: number, column: number): Coordinates;
        public get(rowOrCoordinatesSignature: any, column?: number): Coordinates {
            var row: number;
            if (typeof rowOrCoordinatesSignature === "string") {
                var rowAndColumn = rowOrCoordinatesSignature.split("x");
                row = rowAndColumn[0];
                column = rowAndColumn[1];
            } else {
                row = <number>rowOrCoordinatesSignature;
            }

            var signature = Coordinates.getSignature(row, column);
            var coordinates = this._coordinates[signature];
            if (coordinates === undefined) {
                coordinates = this._coordinates[signature] = new Coordinates(row, column, signature);
            }
            return coordinates;
        }
    }
}