module AgileObjects.BoardGameEngine.Games {

    export class Game {
        constructor(
            public id: string,
            public type: GameType,
            public board: B.Board,
            public events: GameEventSet) {

            this.events.teamAdded.subscribe(data => this.teams.push(data.team) > 0);
            this.events.teamRemoved.subscribe(team => this.teams.remove(team) === void (0));

            this.players = new Array<Pl.Player>();
            this.teams = new Array<T.Team>();
            this.status = new Status.StatusData(this.type.turnDefinition, this);
        }

        public players: Array<Pl.Player>;
        public teams: Array<T.Team>;
        public status: Status.StatusData;

        public add(player: Pl.Player): void {
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