module AgileObjects.BoardGameEngine.Tests.IntegrationTests {

    export interface IGameHelper {
        startDefaultGame(): G.GameWrapper<G.RunTheBombTeamConfigurator>;
    }
}