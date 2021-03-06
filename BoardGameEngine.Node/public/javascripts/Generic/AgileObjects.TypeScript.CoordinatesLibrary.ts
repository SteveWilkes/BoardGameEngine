﻿module AgileObjects.TypeScript {

    export class CoordinatesLibrary {
        static INSTANCE = new CoordinatesLibrary();

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
                row = parseInt(rowAndColumn[0]);
                column = parseInt(rowAndColumn[1]);
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