module AgileObjects.BoardGameEngine.Games {

    export class GameFactory {
        constructor(private _getGameTypeQuery: Ts.IGetQuery<GameType>) { }

        public createNewGame(id: string, gameTypeId: string): Game {
            var events = new GameEventSet();

            var gameType = this._getGameTypeQuery.execute(gameTypeId);

            GameCompletionMonitor.create(events);
            this._setupCustomEvents(events, gameType);

            var board = new Boards.Board(gameType.boardType, events);

            var game = new Game(id, gameType, board, events);

            return game;
        }

        private _setupCustomEvents(events: GameEventSet, gameType: GameType) {
            TypeScript.Annotations.EntityAnnotationManager.create(events, gameType.annotations);

            for (var i = 0; i < gameType.eventMappings.length; i++) {
                gameType.eventMappings[i].setup(events);
            }
        }
    }
} 