module AgileObjects.BoardGameEngine.Games {

    export class GameService {
        constructor(
            private _idGenerator: Angular.Services.IIdGenerator,
            private _gameFactory: GameFactory,
            private _teamFactory: Teams.TeamFactory) { }

        public createDefaultGame(gameTypeId: string, firstHumanPlayer: Pl.Player): Game {
            var gameId = this._idGenerator.generate();
            var game = this._gameFactory.createNewGame(gameId, gameTypeId);

            game.add(firstHumanPlayer);

            var i;
            for (i = 1; i < game.type.maximumNumberOfTeams; i++) {
                game.add(new Players.Player("CPU", false));
            }

            for (i = 0; i < game.players.length; i++) {
                var team = this._teamFactory.createTeamFor(game.players[i], game);
                game.board.add(team);
            }

            return game;
        }
    }
}