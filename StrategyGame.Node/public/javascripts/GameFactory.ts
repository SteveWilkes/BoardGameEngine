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
            private _idGenerator: Angular.Services.IIdGenerator) { }

        public createNewGame(gameTypeId: string): Game {
            var events = new GameEventSet();

            var gameType = this._getGameTypeQuery.execute(gameTypeId, events);

            var board = new Boards.Board(gameType.boardType, events);

            var gameId = this._idGenerator.generate();
            var game = new Game(gameId, gameType, board, events);

            return game;
        }
    }

    angular
        .module(strategyGameApp)
        .service($gameFactory, [
            $getGameTypeQuery,
            Angular.Services.$idGenerator,
            GameFactory]);
} 