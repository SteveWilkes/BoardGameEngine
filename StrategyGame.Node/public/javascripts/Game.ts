module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public displayManager: Boards.BoardDisplayManager,
            public players: Array<Players.IPlayer>,
            public board: Boards.Board,
            turnManager: Status.TurnManager,
            public events: EventSet) {

            this.status = new Status.StatusData(turnManager, this.events);
            this.displayManager.resize(this.board);
        }

        public status: Status.StatusData;
    }
}