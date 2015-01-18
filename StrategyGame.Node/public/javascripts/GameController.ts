module AgileObjects.StrategyGame.Game {
    import Boards = StrategyGame.Game.Boards;

    class GameController {
        constructor(
            public displayManager: Boards.BoardDisplayManager,
            private _gameFactory: IGameFactory,
            private _eventPropogator: Angular.Services.IEventPropogationService) {

            this.globalEvents = GlobalEventSet.instance;

            this._newGame("1");
        }

        public globalEvents: GlobalEventSet;
        public game: Game;

        private _newGame(gameTypeId: string): void {
            this.game = this._gameFactory.createNewGame(gameTypeId, 2);

            this._eventPropogator.propogate(
                this.game.events.pieceAttacked,
                "attack",
                attack => attack.target.coordinates.signature);

            this.displayManager.resize(this.game.board);
        }
    }

    angular
        .module(strategyGameApp)
        .controller("GameController", [
            Boards.$boardDisplayManager,
            $gameFactory,
            Angular.Services.$eventPropogator,
            GameController]);
}