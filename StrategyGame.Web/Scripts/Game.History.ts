module AgileObjects.StrategyGame.Game {

    export class GameHistory {
        constructor(private _initialState: BoardState, private _gameActions: Array<IGameAction>) {
        }
    }
} 