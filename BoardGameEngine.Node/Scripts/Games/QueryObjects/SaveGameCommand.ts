module AgileObjects.BoardGameEngine.Games {

    export class SaveGameCommand implements Ts.ICommand<Game> {

        constructor() { }

        public execute(game: Game): void {
            var gameData = new GameData(game);
        }
    }
}