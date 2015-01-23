module AgileObjects.StrategyGame.Players {
    import Teams = StrategyGame.Teams;

    export interface IPlayer extends Teams.ITeamOwner {
        teams: Array<Teams.Team>;
    }
}