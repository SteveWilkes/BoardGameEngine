module AgileObjects.StrategyGame.Games {
    import Boards = StrategyGame.Boards;

    "ClientOnly";
    class GameController {
        constructor(
            public displayManager: Boards.BoardDisplayManager,
            private _idGenerator: Angular.Services.IIdGenerator,
            private _gameFactory: GameFactory,
            private _teamFactory: Teams.ITeamFactory,
            private _gameUiComponentSet: Ui.IGameUiComponent) {

            this.globalEvents = GlobalEventSet.instance;

            this.newGame("1");

            var player1 = new Players.LocalHumanPlayer("Human");
            var team1 = this._teamFactory.createTeam(player1, this.game.type.id);
            player1.add(team1);
            this.game.addTeam(team1);

            var player2 = new Players.RemotePlayerProxy("CPU", this.game);
            var team2 = this._teamFactory.createTeam(player2, this.game.type.id);
            player2.add(team2);
            this.game.addTeam(team2);

            this.game.start();
        }

        public globalEvents: GlobalEventSet;
        public game: Games.Game;

        public newGame(gameTypeId: string): void {
            var gameId = this._idGenerator.generate();
            this.game = this._gameFactory.createNewGame(gameId, gameTypeId);

            this._gameUiComponentSet.gameCreated(this.game);
            this.displayManager.resize(this.game.board);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [
            Boards.$boardDisplayManager,
            Angular.Services.$idGenerator,
            $gameFactory,
            Teams.$teamFactory,
            Ui.$gameUiComponentSet,
            GameController]);
}