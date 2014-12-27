module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public id: string,
            public displayManager: Boards.BoardDisplayManager,
            public board: Boards.Board,
            public events: EventSet) {

            this.players = new Array<Players.IPlayer>();
            var turnManager = new Status.TurnManager(events);
            this.status = new Status.StatusData(turnManager, this.events);
            this.displayManager.resize(this.board);
        }

        public players: Array<Players.IPlayer>;
        public status: Status.StatusData;

        public addTeam(team: Teams.Team): void {
            var player = <Players.IPlayer>team.owner;
            if (this.players.indexOf(player) === -1) {
                this.players.push(player);

                this.events.playerAdded.publish(player);
            }

            this.events.teamAdded.publish(team);
        }
    }
}