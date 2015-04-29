module AgileObjects.BoardGameEngine.Status {

    export class StatusData {
        private _isComplete: boolean;

        constructor(turnInteractions: Array<P.InteractionType>, events: G.GameEventSet) {
            events.gameWon.subscribe((winningTeam: T.Team) => {
                this.message = "Team " + winningTeam.name + " wins - GAME OVER, MAN! ";
                this._isComplete = true;
                return true;
            });

            this.turnManager = new TurnManager(turnInteractions, events);
            this.history = new History(events);
            this._isComplete = false;
        }

        public history: History;
        public turnManager: TurnManager;
        public message: string;

        public currentTeam(): string {
            var currentTeam = this.turnManager.currentTeam;

            if (currentTeam.owner.isLocal) {
                return "Your team";
            }

            return currentTeam.name;
        }

        public isActive(): boolean {
            return (this.message === undefined) && !this.isComplete();
        }

        public isComplete(): boolean {
            return this._isComplete;
        }
    }
}