module AgileObjects.BoardGameEngine.Players {

    export class PlayerData {
        constructor(player: Player) {
            this.id = player.id;
            this.isHuman = player.isHuman;
            this.numberOfTeams = player.teams.length;
        }

        public id: string;
        public isHuman: boolean;
        public numberOfTeams: number;
    }
}