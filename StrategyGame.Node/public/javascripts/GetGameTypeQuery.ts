module AgileObjects.StrategyGame.Game {

    export var getGameTypeQuery = "$getGameTypeQuery";

    class GetGameTypeQuery implements TypeScript.IGetQuery<GameType> {
        public get(gameTypeId: string): GameType {
            // TODO: Retrieve from a data store and cache:
            return new GameType("1", "1");;
        }
    }

    angular
        .module(strategyGameApp)
        .service(getGameTypeQuery, [GetGameTypeQuery]);
}