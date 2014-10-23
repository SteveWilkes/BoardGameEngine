module AgileObjects.StrategyGame.Game {

    export class GameHistory {
        // ReSharper disable InconsistentNaming
        constructor(private _initialState: BoardState, private _gameActions: Array<IGameAction>) {
            // ReSharper restore InconsistentNaming

        }
    }
} 