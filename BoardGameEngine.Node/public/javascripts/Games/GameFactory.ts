module AgileObjects.BoardGameEngine.Games {

    export class GameFactory {
        constructor(private _getGameTypeQuery: Ts.IGetQuery<GameType>) { }

        public createNewGame(
            id: string,
            gameTypeId: string,
            owner: Pl.Player,
            callback: (err: Error, game?: Game) => void): void {

            var events = new GameEventSet();

            this._getGameTypeQuery.execute(gameTypeId,(err, gameType) => {
                if (err) {
                    callback(err);
                    return;
                }

                GameCompletionMonitor.create(events);
                this._setupCustomEvents(events, gameType);

                var board = new Boards.Board(gameType.boardType, events);

                var game = new Game(id, gameType, owner, board, events);

                callback(null, game);
            });
        }

        private _setupCustomEvents(events: GameEventSet, gameType: GameType) {
            TypeScript.Annotations.EntityAnnotationManager.create(events, gameType.annotations);

            for (var i = 0; i < gameType.eventMappings.length; i++) {
                gameType.eventMappings[i].setup(events);
            }
        }
    }
} 