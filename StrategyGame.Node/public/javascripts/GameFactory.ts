﻿module AgileObjects.StrategyGame.Game {
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
            private _$teamFactory: Teams.ITeamFactory,
            private _$boardFactory: Boards.IBoardFactory,
            private _$idGenerator: Angular.Services.IIdGenerator) { }

        public createNewGame(boardTypeId: string, numberOfTeams: number): Game {
            var events = new EventSet();

            var boardSizeDefaults = new Boards.BoardSizeDefaults(950, 50, 80, 2);
            var displayDataService = new Boards.BoardDisplayDataService(this._$windowService);
            var displayManager = new Boards.BoardDisplayManager(boardSizeDefaults, displayDataService, events);

            var board = this._$boardFactory.createBoard(boardTypeId, numberOfTeams, events);

            var gameId = this._$idGenerator.getId();
            var game = new Game(gameId, displayManager, board, events);

            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._$teamFactory.createTeam(player1, boardTypeId, events);
            player1.add(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", events);
            var team2 = this._$teamFactory.createTeam(player2, boardTypeId, events);
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
            Teams.teamFactory,
            Boards.boardFactory,
            Angular.Services.idGenerator,
            GameFactory]);
} 