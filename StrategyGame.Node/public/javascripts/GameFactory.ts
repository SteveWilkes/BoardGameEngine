module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Players = StrategyGame.Game.Players;
    import Status = StrategyGame.Game.Status;
    import Teams = StrategyGame.Game.Teams;

    export interface IGameFactory {
        createNewGame(boardTypeId: string): Game;
    }

    export var gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(
            private _$windowService: ng.IWindowService,
            private _$teamFactory: Teams.ITeamFactory,
            private _$boardFactory: Boards.IBoardFactory) { }

        public createNewGame(boardTypeId: string): Game {
            var events = new EventSet();

            var boardSizeDefaults = new Boards.BoardSizeDefaults(950, 50, 80, 2);
            var displayDataService = new Boards.BoardDisplayDataService(this._$windowService);
            var displayManager = new Boards.BoardDisplayManager(boardSizeDefaults, displayDataService, events);

            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._$teamFactory.createTeam(player1, boardTypeId, 1, events);
            player1.add(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", events);
            var team2 = this._$teamFactory.createTeam(player2, boardTypeId, 2, events);
            player2.add(team2);

            var teams = [team1, team2];
            var players = [player1, player2];

            var board = this._$boardFactory.createBoard(boardTypeId, teams, events);

            var turnManager = new Status.TurnManager(board, teams, 0, events);

            var game = new Game(displayManager, players, board, turnManager, events);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service(gameFactory, ["$window", Teams.teamFactory, Boards.boardFactory, GameFactory]);
} 