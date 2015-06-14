module AgileObjects.BoardGameEngine.Games {
    
    export class GameMapper {
        constructor(
            private _gameFactory: GameFactory,
            private _teamFactory: T.TeamFactory) {
        }

        public map(gameData: GameData): Game {
            var game = this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId);

            for (var i = 0; i < gameData.playerData.length; i++) {
                var playerData = gameData.playerData[i];
                var player = new Players.Player(playerData.id, playerData.isHuman);
                game.add(player);
                for (var j = 0; j < playerData.numberOfTeams; j++) {
                    var team = this._teamFactory.createTeamFor(player, game);
                    game.board.add(team);
                }
            }

            return game;
        }
    }
}