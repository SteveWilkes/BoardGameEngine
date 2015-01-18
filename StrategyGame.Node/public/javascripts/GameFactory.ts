module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Players = StrategyGame.Game.Players;
    import Status = StrategyGame.Game.Status;
    import Teams = StrategyGame.Game.Teams;

    export interface IGameFactory {
        createNewGame(boardTypeId: string): Game;
    }

    export var $gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(
            private _getGameTypeQuery: TypeScript.IGetQuery<GameType>,
            private _teamFactory: Teams.ITeamFactory,
            private _gameCoordinator: Status.IGameCoordinator,
            private _idGenerator: Angular.Services.IIdGenerator) { }

        public createNewGame(gameTypeId: string): Game {
            var events = new GameEventSet();

            var gameType = this._getGameTypeQuery.execute(gameTypeId, events);

            var board = new Boards.Board(gameType.boardType, events);

            var gameId = this._idGenerator.generate();
            var game = new Game(gameId, gameType, board, events);

            this._gameCoordinator.monitor(game);

            var teams = this._getTeams(game);

            game.addTeam(teams[0]);
            game.addTeam(teams[1]);

            game.start();

            return game;
        }

        private _getTeams(game: Game): Array<Teams.Team> {
            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._teamFactory.createTeam(player1, game.type.id);
            player1.add(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", game);
            var team2 = this._teamFactory.createTeam(player2, game.type.id);
            player2.add(team2);

            return [team1, team2];
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameFactory, [
            $getGameTypeQuery,
            Teams.$teamFactory,
            Status.$clientGameCoordinator,
            Angular.Services.$idGenerator,
            GameFactory]);
} 