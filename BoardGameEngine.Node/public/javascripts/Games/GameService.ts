module AgileObjects.BoardGameEngine.Games {

    export class GameService {
        constructor(
            private _idGenerator: Angular.Services.IIdGenerator,
            private _gameFactory: GameFactory,
            private _teamFactory: Teams.TeamFactory) { }

        public createDefaultGame(gameTypeId: string): Game {
            var gameId = this._idGenerator.generate();
            var game = this._gameFactory.createNewGame(gameId, gameTypeId);

            for (var i = 0; i < game.type.maximumNumberOfTeams; i++) {
                var isLocalHumanPlayer = i === 0;

                var player = new Players.Player(
                    isLocalHumanPlayer ? "Human" : "CPU",
                    isLocalHumanPlayer,
                    isLocalHumanPlayer);

                game.add(player);

                var team = this._teamFactory.createTeamFor(player, game);
                game.board.add(team);
            }

            return game;
        }
    }
}