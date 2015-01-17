module AgileObjects.StrategyGame.Game {

    export class Game implements Status.IGameCoordinationSubject {
        constructor(
            public id: string,
            public type: GameType,
            public board: Boards.Board,
            public events: GameEventSet) {

            this.players = new Array<Players.IPlayer>();
            this.status = new Status.StatusData(this.events);
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

        public start() {
            var startingTeam = this.players[0].teams[0];
            this.events.gameStarted.publish(startingTeam);
        }
    }
}