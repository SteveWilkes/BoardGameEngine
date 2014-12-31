module AgileObjects.StrategyGame.Game {

    export class GlobalEventSet {
        static instance = new GlobalEventSet();

        public containerResized = new TypeScript.EventHub<Boards.Board>();
    }
} 