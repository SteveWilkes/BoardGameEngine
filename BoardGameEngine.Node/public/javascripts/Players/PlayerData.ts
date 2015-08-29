module AgileObjects.BoardGameEngine.Players {

    export class PlayerData {
        constructor(player?: Player) {
            if (player) {
                this.id = player.id;
                this.name = player.name;
            }
        }

        public id: string;
        public name: string;
    }
}