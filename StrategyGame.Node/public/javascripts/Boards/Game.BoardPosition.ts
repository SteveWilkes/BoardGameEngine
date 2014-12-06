module AgileObjects.StrategyGame.Game {

    export class BoardPosition {
        private _gridSize: number;

        constructor(
            public name: string,
            private _coordinateTranslator: (coordinates: Coordinates, gridSize: number) => Coordinates,
            public isFocusPosition: boolean = false) {
        }

        public setGridSize(gridSize: number) {
            this._gridSize = gridSize;
        }

        public translate(coordinates: Coordinates): Coordinates {
            return this._coordinateTranslator(coordinates, this._gridSize);
        }
    }
} 