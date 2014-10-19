module AgileObjects.StrategyGame.Game {

    export class BoardConfig {
        public gridSize = 8;
        public tileBorderWidth = 2;
    }

    game.service("$boardConfig", BoardConfig);
}