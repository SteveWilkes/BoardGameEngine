module AgileObjects.BoardGameEngine.Games {

    export class Game {
        constructor(
            public id: string,
            public type: Games.GameType,
            public board: Boards.Board,
            public events: GameEventSet) {

            this.events.teamAdded.subscribe(team => this.teams.push(team) > 0);

            this.players = new Array<Players.Player>();
            this.teams = new Array<Teams.Team>();
            this.status = new Status.StatusData(this.events);
        }

        public players: Array<Players.Player>;
        public teams: Array<Teams.Team>;
        public status: Status.StatusData;

        public add(player: Players.Player): void {
            if (this.players.indexOf(player) === -1) {
                this.players.push(player);

                this.events.playerJoined.publish(player);
            }
        }

        public start() {
            var startingTeam = this.players[0].teams[0];
            this.events.gameStarted.publish(startingTeam);
        }
    }
}