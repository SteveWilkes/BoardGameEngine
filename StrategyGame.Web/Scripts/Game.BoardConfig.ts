module AgileObjects.StrategyGame.Game {

    export class BoardConfig {
        constructor(public settings: BoardSettings, public state: BoardState) {
        }
    }
}