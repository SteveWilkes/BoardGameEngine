module AgileObjects.BoardGameEngine.Tests.IntegrationTests {

    export interface IGameHelper {
        startDefaultGame(
            configuration: (configurator: G.RunTheBombTeamConfigurator) => void,
            callback: (gw: G.GameWrapper<G.RunTheBombTeamConfigurator>) => void): void;
    }
}