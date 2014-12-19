module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Players = StrategyGame.Game.Players;
    import Status = StrategyGame.Game.Status;
    import Teams = StrategyGame.Game.Teams;

    export interface IGameFactory {
        createNewGame(boardType: Boards.BoardType): Game;
    }

    export var gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(private _$window: ng.IWindowService, private _$teamFactory: Teams.ITeamFactory) { }

        public createNewGame(boardType: Boards.BoardType): Game {
            var events = new EventSet();

            var boardSizeDefaults = new Boards.BoardSizeDefaults(950, 50, 80, 2);
            var container = new Boards.BoardDisplayDataService(this._$window);
            var sizeManager = new Boards.BoardDisplayManager(boardSizeDefaults, container, events);

            var player1 = new Players.HumanPlayer("Human", true);
            var team1 = this._$teamFactory.createTeam(player1, boardType.id);

            var player2 = new Players.AiPlayerProxy("CPU", events);
            var team2 = this._$teamFactory.createTeam(player2, boardType.id);

            var teams = [team1, team2];

            var board = new Boards.Board(boardType, teams, events);

            var turnManager = new Status.TurnManager(board, teams, 0, events);

            var game = new Game(sizeManager, board, turnManager, events);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, ["$window", Teams.teamFactory, GameFactory]);
} 