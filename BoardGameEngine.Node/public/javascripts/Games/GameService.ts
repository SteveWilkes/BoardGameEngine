module AgileObjects.BoardGameEngine.Games {

    export class GameService {
        constructor(
            private _idGenerator: Angular.Services.IIdGenerator,
            private _gameFactory: GameFactory,
            private _teamFactory: Teams.ITeamFactory) { }

        public createDefaultGame(gameTypeId: string): Game {
            var gameId = this._idGenerator.generate();
            var game = this._gameFactory.createNewGame(gameId, gameTypeId);

            // TODO: Get default game setup from game.type
            var player1 = new Players.Player("Human", true, true);
            game.add(player1);

            var player2 = new Players.Player("CPU", false);
            game.add(player2);

            var team1 = this._teamFactory.createTeam(1, player1, game.type.id);
            game.board.add(team1);

            var team2 = this._teamFactory.createTeam(2, player2, game.type.id);
            game.board.add(team2);

            return game;
        }
    }
}