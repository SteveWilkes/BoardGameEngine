module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Status = StrategyGame.Game.Status;

    export class Game {
        constructor(
            public sizeManager: Boards.BoardDisplayManager,
            public board: Boards.Board,
            turnManager: Status.TurnManager,
            public events: EventSet) {

            this.status = new Status.StatusData(turnManager);
            this.sizeManager.resize(this.board);
        }

        public status: Status.StatusData;
    }
}