module AgileObjects.BoardGameEngine.Games {

    export class GameMapper {
        constructor(
            private _gameFactory: GameFactory,
            private _teamFactory: T.TeamFactory) { }

        public map(gameData: GameData, callback: (err: Error, game?: Game) => void): void {
            var gameOwner = this._getGameOwner(gameData);

            this._gameFactory.createNewGame(gameData.gameId, gameData.gameTypeId, gameOwner,(createError, game) => {
                if (createError) {
                    callback(createError);
                    return;
                }

                var i, player;
                var players = <Ts.IStringDictionary<Pl.Player>>{};
                for (i = 0; i < gameData.playerData.length; i++) {
                    var playerData = gameData.playerData[i];

                    if (playerData.id !== gameOwner.id) {
                        player = this._getPlayerFor(playerData);
                        game.add(player);
                    } else {
                        player = gameOwner;
                    }
                    players[playerData.id] = player;
                }

                for (i = 0; i < gameData.teamData.length; i++) {
                    player = players[gameData.teamData[i].playerId];
                    var team = this._teamFactory.createTeamFor(player, game);
                    game.board.add(team);
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

                callback(null, game);
            });
        }

        private _getGameOwner(gameData: GameData): Pl.Player {
            for (var i = 0; i < gameData.playerData.length; i++) {
                if (gameData.playerData[i].id === gameData.ownerId) {
                    return this._getPlayerFor(gameData.playerData[i]);
                }
            }

            throw new Error("Unable to find Game Owner with id " + gameData.ownerId);
        }

        private _getPlayerFor(playerData: Pl.PlayerData): Pl.Player {
            return new Players.Player(playerData.id, playerData.name, !playerData.id.startsWith("CPU"));
        }
    }
}