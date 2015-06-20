module AgileObjects.BoardGameEngine.Games {

    export class GameMapper {
        constructor(
            private _gameFactory: GameFactory,
            private _teamFactory: T.TeamFactory) { }

        public map(gameData: GameData): Game {
            var gameOwner = this._getGameOwner(gameData);
            var game = this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId, gameOwner);

            var i;
            for (i = 0; i < gameData.playerData.length; i++) {
                var playerData = gameData.playerData[i];
                var player = playerData.toPlayer();

                if (player.id !== gameData.ownerId) {
                    game.add(player);
                }

                for (var j = 0; j < playerData.numberOfTeams; j++) {
                    var team = this._teamFactory.createTeamFor(player, game);
                    game.board.add(team);
                }
            }

            var validateTurn = () => {
                return Interactions.TurnCompletionManager.complete(game);
            };

            game.start();
            game.events.turnEnded.subscribe(validateTurn);

            var turnApplicationManager = new Interactions.TurnApplicationManager(game);

            for (i = 0; i < gameData.historyData.length; i++) {
                var interactionId = Interactions.InteractionId.from(gameData.historyData[i]);
                turnApplicationManager.apply(interactionId);
            }

            game.events.turnEnded.unsubscribe(validateTurn);

            return game;
        }

        private _getGameOwner(gameData: GameData): Pl.Player {
            for (var i = 0; i < gameData.playerData.length; i++) {
                if (gameData.playerData[i].id === gameData.ownerId) {
                    return gameData.playerData[i].toPlayer();
                }
            }

            throw new Error("Unable to find Game Owner with id " + gameData.ownerId);
        }
    }
}