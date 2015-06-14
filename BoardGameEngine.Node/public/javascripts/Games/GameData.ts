module AgileObjects.BoardGameEngine.Games {

    export class GameData {
        constructor(game: Game) {
            this.gameId = game.id;
            this.gameTypeId = game.type.id;
            this.playerData = new Array<Pl.PlayerData>(game.players.length);
            this.historyData = new Array<string>(game.status.history.actions.length);

            var i;
            for (i = 0; i < this.playerData.length; i++) {
                this.playerData[i] = new Players.PlayerData(game.players[i]);
            }

            for (i = 0; i < this.historyData.length; i++) {
                this.historyData[i] = game.status.history.actions[i].interactionId;
            }
        }

        public gameId: string;
        public gameTypeId: string;
        public playerData: Array<Pl.PlayerData>;
        public historyData: Array<string>;
    }
}