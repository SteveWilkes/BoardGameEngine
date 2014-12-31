module AgileObjects.StrategyGame.Game.Status {

    export class StatusData {
        private _turnManager: TurnManager;

        constructor(events: GameEventSet) {
            this._turnManager = new Status.TurnManager(events);
            this.history = new History(events);
        }

        public history: History;

        public whosTurn(): string {
            if (this._turnManager.currentTeam.owner.isLocal) {
                return "Your turn!";
            }

            return this._turnManager.currentTeam.name + "'s turn";
        }
    }
}