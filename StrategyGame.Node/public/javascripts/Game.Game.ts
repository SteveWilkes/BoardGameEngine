module AgileObjects.StrategyGame.Game {

    export class Game {
        private _turnManager: TurnManager;

        constructor(
            public sizeManager: BoardSizeManager,
            public board: Board,
            teams: Array<Team>,
            public events: EventSet) {

            this.sizeManager.resize(this.board);

            this.board.add(teams);

            this._turnManager = new TurnManager(this.board, teams, this.events);
        }
    }
}