module AgileObjects.BoardGameEngine.Status {

    export class GameData {
        constructor(game: Games.Game) {
            this.gameId = game.id;
            this.gameTypeId = game.type.id;
            this.playerData = new Array<string>();

            for (var i = 0; i < game.players.length; i++) {
                var player = game.players[i];
                this.playerData[i] =
                player.id +
                "*" +
                (player.isHuman ? "1" : "0") +
                "*" +
                player.teams.length;
            }
        }

        public gameId: string;
        public gameTypeId: string;
        public playerData: Array<string>;
    }
}