module AgileObjects.StrategyGame.Status {

    export class GameData {
        constructor(game: Games.Game) {
            this.gameId = game.id;
            this.gameTypeId = game.type.id;
            this.playerData = new Array<string>();

            for (var i = 0; i < game.players.length; i++) {
                var player = game.players[i];
                this.playerData[i] = player.id + "*" + (player.isHuman ? "1" : "0");
                for (var j = 0; j < player.teams.length; j++) {
                    this.playerData[i] += "*" + player.teams[j].id;
                }
            }
        }

        public gameId: string;
        public gameTypeId: string;
        public playerData: Array<string>;
    }
}