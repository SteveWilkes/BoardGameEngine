module AgileObjects.BoardGameEngine.Status {

    export class StatusData {
        private _turnManager: TurnManager;

        constructor(events: Games.GameEventSet) {
            this._turnManager = new Status.TurnManager(events);
            this.history = new History(events);
        }

        public history: History;

        public getCurrentTeam(): Teams.Team {
            return this._turnManager.currentTeam;
        }

        public whosTurn(): string {
            var currentTeam = this.getCurrentTeam();

            if (currentTeam.owner.isLocal) {
                return "Your turn!";
            }

            return currentTeam.name + "'s turn";
        }
    }
}