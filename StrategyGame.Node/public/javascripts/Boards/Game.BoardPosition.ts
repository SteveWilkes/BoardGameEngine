module AgileObjects.StrategyGame.Game {

    export class BoardPosition {
        constructor(
            public name: string,
            private _coordinateTranslator: (coordinates: Coordinates, gridSize: number) => Coordinates) {
        }

        public translate(coordinates: Coordinates, gridSize: number): Coordinates {
            return this._coordinateTranslator(coordinates, gridSize);
        }
    }
} 