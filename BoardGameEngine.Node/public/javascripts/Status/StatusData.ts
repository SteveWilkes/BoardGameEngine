module AgileObjects.BoardGameEngine.Status {

    export class StatusData {
        private _isComplete: boolean;

        constructor(turnDefinition: I.TurnDefinition, game: G.Game) {
            game.events.gameWon.subscribe((winningTeam: T.Team) => {
                this.message = "Team " + winningTeam.name + " wins - GAME OVER, MAN! ";
                this._isComplete = true;
                return true;
            });

            this.turnManager = new TurnManager(turnDefinition, game);
            this.history = new History(game.events);
            this._isComplete = false;
        }

        public history: History;
        public turnManager: TurnManager;
        public message: string;

        public getCurrentTeamName(): string {
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