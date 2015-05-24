module AgileObjects.BoardGameEngine.Tests.IntegrationTests {

    export interface IGameHelper {
        startDefaultGame(configurator: (gameWrapper: G.GameWrapper<G.RunTheBombTeamConfigurator>) => void):
            G.GameWrapper<G.RunTheBombTeamConfigurator>;
    }
}