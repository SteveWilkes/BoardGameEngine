module AgileObjects.BoardGameEngine.Status {

    export class StatusData {
        constructor(turnInteractions: Array<Pieces.InteractionType>, events: Games.GameEventSet) {
            this.turnManager = new Status.TurnManager(turnInteractions, events);
            this.history = new History(events);
        }

        public history: History;
        public turnManager: TurnManager;

        public whosTurn(): string {
            var currentTeam = this.turnManager.currentTeam;

            if (currentTeam.owner.isLocal) {
                return "Your turn!";
            }

            return currentTeam.name + "'s turn";
        }
    }
}