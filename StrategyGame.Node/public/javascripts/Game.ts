module AgileObjects.StrategyGame.Game {

    export class Game {
        constructor(
            public id: string,
            public type: GameType,
            public displayManager: Boards.BoardDisplayManager,
            public board: Boards.Board,
            public events: GameEventSet) {

            this.players = new Array<Players.IPlayer>();
            this.status = new Status.StatusData(this.events);
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