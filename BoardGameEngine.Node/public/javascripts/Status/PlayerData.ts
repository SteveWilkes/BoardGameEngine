module AgileObjects.BoardGameEngine.Status {

    export class PlayerData {
        constructor(player: Players.IPlayer) {
            this.id = player.id;
            this.isHuman = player.isHuman;
            this.numberOfTeams = player.teams.length;
        }

        public id: string;
        public isHuman: boolean;
        public numberOfTeams: number;
    }
}