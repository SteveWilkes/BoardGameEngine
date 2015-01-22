module AgileObjects.StrategyGame.Game.Players {
    import Teams = StrategyGame.Game.Teams;

    export interface IPlayer extends Teams.ITeamOwner {
        teams: Array<Teams.Team>;
    }
}