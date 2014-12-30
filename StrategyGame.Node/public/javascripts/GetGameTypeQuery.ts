module AgileObjects.StrategyGame.Game {

    export var getGameTypeQuery = "$getGameTypeQuery";

    class GetGameTypeQuery implements TypeScript.IGetQuery<GameType> {
        public execute(gameTypeId: string): GameType {
            // TODO: Retrieve GameType from a data store and cache:
            return new GameType("1", "1");;
        }
    }

    angular
        .module(strategyGameApp)
        .service(getGameTypeQuery, [GetGameTypeQuery]);
}