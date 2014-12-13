module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public sizeManager: BoardDisplayManager,
            public board: Board,
            turnManager: TurnManager,
            public events: EventSet) {

            this.status = new Status(turnManager);
            this.sizeManager.resize(this.board);
        }

        public status: Status;
    }
}