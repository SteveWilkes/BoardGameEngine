module AgileObjects.StrategyGame.Game {

    export var $getGameTypeQuery = "$getGameTypeQuery";

    class GetGameTypeQuery implements TypeScript.IGetQuery<GameType> {
        constructor(private _getBoardTypeQuery: TypeScript.IGetQuery<Boards.BoardType>) { }

        public execute(gameTypeId: string, events: GameEventSet): GameType {
            var boardType = this._getBoardTypeQuery.execute("1");

            var turnDefinition = new Status.TurnDefinition([Pieces.InteractionType.Attack, Pieces.InteractionType.Move], events);

            // TODO: Retrieve GameType from a data store and cache:
            return new GameType("1", boardType, turnDefinition);
        }
    }

    angular
        .module(strategyGameApp)
        .service($getGameTypeQuery, [Boards.$getBoardTypeQuery, GetGameTypeQuery]);
}