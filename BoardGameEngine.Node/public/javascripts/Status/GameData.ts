module AgileObjects.BoardGameEngine.Status {

    export class GameData {
        constructor(game: Games.Game) {
            this.gameId = game.id;
            this.gameTypeId = game.type.id;
            this.playerData = new Array<PlayerData>(game.players.length);

            for (var i = 0; i < game.players.length; i++) {
                this.playerData[i] = new PlayerData(game.players[i]);
            }
        }

        public gameId: string;
        public gameTypeId: string;
        public playerData: Array<PlayerData>;
    }
}