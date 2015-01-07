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
            var game = new Game(gameId, gameType, displayManager, board, events);

            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._teamFactory.createTeam(player1, gameType.id, events);
            player1.add(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", events);
            var team2 = this._teamFactory.createTeam(player2, gameType.id, events);
            player2.add(team2);

            game.addTeam(team1);
            game.addTeam(team2);

            events.gameStarted.publish(team1);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameFactory, [
            "$timeout",
            $getGameTypeQuery,
            Teams.$teamFactory,
            Angular.Services.$eventPropogator,
            Angular.Services.$idGenerator,
            GameFactory]);
} 