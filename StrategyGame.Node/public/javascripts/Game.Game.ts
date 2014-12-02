module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public sizeManager: BoardSizeManager,
            public board: Board,
            teams: Array<Team>,
            public events: EventSet) {

            this.sizeManager.resize(this.board);
            this.board.add(teams);

            this._registerTeams(teams);
        }

        private _registerTeams(teams: Array<Team>) {
            var turnManager = new TurnManager(this.events);
            for (var i = 0; i < teams.length; i++) {
                turnManager.register(teams[i]);
            }
        }
    }
}