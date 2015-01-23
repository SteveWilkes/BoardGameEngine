module AgileObjects.StrategyGame.Games {

    export class GameFactory {
        constructor(private _getGameTypeQuery: TypeScript.IGetQuery<GameType>) { }

        public createNewGame(id: string, gameTypeId: string): Games.Game {
            var events = new GameEventSet();

            var gameType = this._getGameTypeQuery.execute(gameTypeId, events);

            var board = new Boards.Board(gameType.boardType, events);

            var game = new Game(id, gameType, board, events);

            return game;
        }
    }
} 