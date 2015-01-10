module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;
    import Players = StrategyGame.Game.Players;
    import Status = StrategyGame.Game.Status;
    import Teams = StrategyGame.Game.Teams;

    export interface IGameFactory {
        createNewGame(
            displayManager: Boards.BoardDisplayManager,
            boardTypeId: string,
            numberOfTeams: number): Game;
    }

    export var $gameFactory = "$gameFactory";

    class GameFactory implements IGameFactory {
        constructor(
            private _timeoutService: ng.ITimeoutService,
            private _getGameTypeQuery: TypeScript.IGetQuery<GameType>,
            private _teamFactory: Teams.ITeamFactory,
            private _gameCoordinator: Status.IGameCoordinator,
            private _eventPropogator: Angular.Services.IEventPropogationService,
            private _idGenerator: Angular.Services.IIdGenerator) { }

        public createNewGame(
            displayManager: Boards.BoardDisplayManager,
            gameTypeId: string,
            numberOfTeams: number): Game {
            var events = new GameEventSet();

            this._eventPropogator.propogate(
                events.pieceAttacked,
                "attack",
                attack => attack.target.coordinates.signature);

            var gameType = this._getGameTypeQuery.execute(gameTypeId, events);

            var interactionMonitor = new Pieces.PieceInteractionMonitor(this._timeoutService, gameType.interactionRegulator, events);
            var board = new Boards.Board(gameType.boardType, interactionMonitor, numberOfTeams, events);

            var gameId = this._idGenerator.getId();
            var game = new Game(gameId, gameType, displayManager, this._gameCoordinator, board, events);

            var teams = this._getTeams(gameType, events);

            game.addTeam(teams[0]);
            game.addTeam(teams[1]);

            game.start();

            return game;
        }

        private _getTeams(gameType: GameType, events: GameEventSet): Array<Teams.Team> {
            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._teamFactory.createTeam(player1, gameType.id, events);
            player1.add(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", events);
            var team2 = this._teamFactory.createTeam(player2, gameType.id, events);
            player2.add(team2);

            return [team1, team2];
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameFactory, [
            "$timeout",
            $getGameTypeQuery,
            Teams.$teamFactory,
            Status.$gameCoordinator,
            Angular.Services.$eventPropogator,
            Angular.Services.$idGenerator,
            GameFactory]);
} 