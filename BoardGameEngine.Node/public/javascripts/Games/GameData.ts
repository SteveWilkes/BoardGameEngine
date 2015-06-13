module AgileObjects.BoardGameEngine.Games {

    export class GameData {
        constructor(game: Game) {
            this.gameId = game.id;
            this.gameTypeId = game.type.id;
            this.playerData = new Array<Pl.PlayerData>(game.players.length);

            for (var i = 0; i < game.players.length; i++) {
                this.playerData[i] = new Players.PlayerData(game.players[i]);
            }
        }

        public gameId: string;
        public gameTypeId: string;
        public playerData: Array<Pl.PlayerData>;
    }
}