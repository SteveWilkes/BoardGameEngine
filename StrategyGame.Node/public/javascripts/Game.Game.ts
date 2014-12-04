module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public sizeManager: BoardSizeManager,
            public board: Board,
            teams: Array<Team>,
            public events: EventSet) {

            this.sizeManager.resize(this.board);

            this.board.add(teams);

            TurnManager.create(teams, this.events);
        }
    }
}