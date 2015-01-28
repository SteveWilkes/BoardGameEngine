module AgileObjects.BoardGameEngine.Boards {

    export class BoardPosition {
        private _gridSize: number;

        constructor(
            public name: string,
            private _coordinateTranslator: (coordinates: TypeScript.Coordinates, gridSize: number) => TypeScript.Coordinates,
            public isFocusPosition: boolean = false) {
        }

        public setGridSize(gridSize: number) {
            this._gridSize = gridSize;
        }

        public translate(coordinates: TypeScript.Coordinates): TypeScript.Coordinates {
            return this._coordinateTranslator(coordinates, this._gridSize);
        }
    }
} 