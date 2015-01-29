module AgileObjects.BoardGameEngine.Status {

    export class PlayerData {
        constructor(player: Players.Player) {
            this.id = player.id;
            this.isHuman = player.isHuman;
            this.numberOfTeams = player.teams.length;
        }

        public id: string;
        public isHuman: boolean;
        public numberOfTeams: number;
    }
}