module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Players = StrategyGame.Game.Players;
    import Status = StrategyGame.Game.Status;
    import Teams = StrategyGame.Game.Teams;

    export interface IGameFactory {
        createNewGame(boardTypeId: string, numberOfTeams: number): Game;
    }

    export var gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(
            private _$windowService: ng.IWindowService,
            private _getGameTypeQuery: TypeScript.IGetQuery<GameType>,
            private _$boardFactory: Boards.IBoardFactory,
            private _$teamFactory: Teams.ITeamFactory,
            private _$idGenerator: Angular.Services.IIdGenerator) { }

        public createNewGame(gameTypeId: string, numberOfTeams: number): Game {
            var events = new EventSet();

            var gameType = this._getGameTypeQuery.execute(gameTypeId);

            var displayDataService = new Boards.BoardDisplayDataService(this._$windowService);
            var displayManager = new Boards.BoardDisplayManager(displayDataService, events);

            var board = this._$boardFactory.createBoard(gameType.boardTypeId, numberOfTeams, events);

            var gameId = this._$idGenerator.getId();
            var game = new Game(gameId, displayManager, board, events);

            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._$teamFactory.createTeam(player1, gameType.id, events);
            player1.add(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", events);
            var team2 = this._$teamFactory.createTeam(player2, gameType.id, events);
            player2.add(team2);

            game.addTeam(team1);
            game.addTeam(team2);

            events.gameStarted.publish(team1);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, [
            "$window",
            getGameTypeQuery,
            Boards.boardFactory,
            Teams.teamFactory,
            Angular.Services.idGenerator,
            GameFactory]);
} 