module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public sizeManager: Boards.BoardDisplayManager,
            public board: Boards.Board,
            turnManager: Status.TurnManager,
            public events: EventSet) {

            this.status = new Status.StatusData(turnManager, this.events);
            this.sizeManager.resize(this.board);
        }

        public status: Status.StatusData;
    }
}