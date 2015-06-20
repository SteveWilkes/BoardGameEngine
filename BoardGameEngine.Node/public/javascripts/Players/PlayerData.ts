module AgileObjects.BoardGameEngine.Players {

    export class PlayerData {
        constructor(player: Player) {
            this.id = player.id;
            this.name = player.name;
            this.isHuman = player.isHuman;
            this.numberOfTeams = player.teams.length;
        }

        public id: string;
        public name: string;
        public isHuman: boolean;
        public numberOfTeams: number;

        public toPlayer(): Player {
            return new Players.Player(this.id, this.name, this.isHuman);
        }
    }
}