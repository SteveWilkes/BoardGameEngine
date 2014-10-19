module AgileObjects.StrategyGame.Game {

    export class BoardConfig {
        constructor(public gridSize: number, public tileBorderWidth: number) {
            this.tileSizeFactor = (gridSize * 2) - Math.floor(gridSize / 4);
        }

        public tileSizeFactor: number;
    }
}