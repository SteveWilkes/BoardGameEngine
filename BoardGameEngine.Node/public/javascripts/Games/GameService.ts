module AgileObjects.BoardGameEngine.Games {

    export class GameService {
        constructor(
            private _idGenerator: Angular.Services.IIdGenerator,
            private _gameFactory: GameFactory,
            private _teamFactory: Teams.TeamFactory) { }

        public createDefaultGame(gameTypeId: string, owner: Pl.Player, callback: (err: Error, game?: Game) => void): void {
            var gameId = this._idGenerator.generate();

            this._gameFactory.createNewGame(gameId, gameTypeId, owner,(createError, game) => {
                if (createError) {
                    callback(createError);
                    return;
                }

                var i;
                for (i = 1; i < game.type.maximumNumberOfTeams; i++) {
                    game.add(new Players.Player("CPU" + i, "CPU", false));
                }

                for (i = 0; i < game.players.length; i++) {
                    var team = this._teamFactory.createTeamFor(game.players[i], game);
                    game.board.add(team);
                }

                callback(null, game);
            });
        }
    }
}