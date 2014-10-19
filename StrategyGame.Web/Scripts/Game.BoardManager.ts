module AgileObjects.StrategyGame.Game {

    export interface IBoardManager {
        board: Board;
    }

    class BoardManager {
        // ReSharper disable InconsistentNaming
        constructor(private _$config: BoardConfig) {
            // ReSharper restore InconsistentNaming
            this.board = new Board(this._$config.gridSize);
        }

        public board: Board;
    }

    game.factory("$boardManager", ["$boardConfig",
        ($config: BoardConfig) => new BoardManager($config)
    ]);
}