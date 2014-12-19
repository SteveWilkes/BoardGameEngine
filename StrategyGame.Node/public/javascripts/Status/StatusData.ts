module AgileObjects.StrategyGame.Game.Status {

    export class StatusData {
        constructor(private _turnManager: TurnManager, events: EventSet) {
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