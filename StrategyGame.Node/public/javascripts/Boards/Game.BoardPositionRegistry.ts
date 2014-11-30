module AgileObjects.StrategyGame.Game {

    export class BoardPositionRegistry {
        public north = new BoardPosition((c: Coordinates) => c);
        public south = new BoardPosition((c: Coordinates, gridSize: number) => coordinatesRegistry.get(gridSize - (c.row - 1), c.column));
    }

    export var boardPositions = new BoardPositionRegistry();
} 