module AgileObjects.StrategyGame.Game {

    export class Board {
        constructor(gridSize: number) {
            this.tiles = new Array<BoardTile>();
            for (var row = 0; row < gridSize; row++) {
                for (var column = 0; column < gridSize; column++) {
                    this.tiles.push(new BoardTile(row + 1, column + 1));
                }
            }
        }

        public tiles: Array<BoardTile>;
        public size: number;
    }
}